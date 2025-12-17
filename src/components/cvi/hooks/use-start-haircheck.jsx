import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDaily, useDevices } from '@daily-co/daily-react';

export const useStartHaircheck = () => {
	const daily = useDaily();
	const { micState } = useDevices();

	const [permissionState, setPermissionState] = useState(null);

	useEffect(() => {
		// Safari doesn't support permissions.query for microphone/camera
		// So we'll check if we're on Safari and handle it differently
		const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		
		if (isSafari) {
			// For Safari, we'll assume permissions are prompt until proven otherwise
			setPermissionState('prompt');
		} else {
			// Chrome and other browsers support permissions.query
			navigator.permissions.query({ name: 'microphone' }).then((permissionStatus) => {
				setPermissionState(permissionStatus.state);
				permissionStatus.onchange = () => {
					setPermissionState(permissionStatus.state);
				};
			}).catch(() => {
				// Fallback if permissions API is not available
				setPermissionState('prompt');
			});
		}
	}, []);

	const requestPermissions = useCallback(async () => {
		if (!daily) return;

		const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

		try {
			// Step 1: Request MICROPHONE permission first
			console.log('Requesting microphone permission only...');
			const audioStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false
			});

			console.log('Microphone permission granted');

			// Step 2: Now request CAMERA permission
			let videoGranted = false;
			try {
				console.log('Now requesting camera permission...');
				const videoStream = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: false
				});

				console.log('Camera permission granted');
				videoGranted = true;

				// Clean up the temporary video stream
				videoStream.getTracks().forEach(track => track.stop());
			} catch (videoError) {
				console.log('Camera permission denied or not available, continuing with microphone only');
				videoGranted = false;
			}

			// Step 3: Initialize Daily with the permissions we got
			const cameraOptions = {
				startVideoOff: !videoGranted,  // Start with camera ON if granted, OFF if denied
				startAudioOff: false,           // Always start with microphone ON
			};

			// Only add advanced settings for non-Safari browsers
			// Note: Keeping noise-cancellation for echo cancellation (prevents AI hearing itself)
			// but removing background-blur for faster startup
			if (!isSafari) {
				cameraOptions.audioSource = true;
				cameraOptions.inputSettings = {
					audio: {
						processor: {
							type: 'noise-cancellation',
						},
					},
				};
			}

			await daily.startCamera(cameraOptions);

			// Clean up the temporary audio stream (Daily will create its own)
			audioStream.getTracks().forEach(track => track.stop());

			// For Safari, explicitly set permission state
			if (isSafari) {
				setPermissionState('granted');
			}

			console.log(`Daily initialized with microphone ${videoGranted ? 'and camera' : 'only'}`);
		} catch (error) {
			console.error('Failed to get microphone permission:', error);
			setPermissionState('denied');
		}
	}, [daily]);

	const isPermissionsPrompt = useMemo(() => {
		return permissionState === 'prompt';
	}, [permissionState]);

	const isPermissionsLoading = useMemo(() => {
		return (permissionState === null || permissionState === 'granted') && micState === 'idle';
	}, [permissionState, micState]);

	const isPermissionsGranted = useMemo(() => {
		return permissionState === 'granted';
	}, [permissionState]);

	const isPermissionsDenied = useMemo(() => {
		return permissionState === 'denied';
	}, [permissionState]);

	return {
		isPermissionsPrompt,
		isPermissionsLoading,
		isPermissionsGranted,
		isPermissionsDenied,
		requestPermissions,
	};
};
