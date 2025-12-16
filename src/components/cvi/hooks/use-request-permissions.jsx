import { useCallback } from 'react';
import { useDaily } from '@daily-co/daily-react';

export const useRequestPermissions = () => {
	const daily = useDaily();

	const requestPermissions = useCallback(async () => {
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
			if (!isSafari) {
				cameraOptions.audioSource = true;
				cameraOptions.inputSettings = {
					audio: {
						processor: {
							type: 'noise-cancellation',
						},
					},
				};

				// Add video settings if camera was granted
				if (videoGranted) {
					cameraOptions.inputSettings.video = {
						processor: {
							type: 'background-blur'
						}
					};
				}
			}

			await daily?.startCamera(cameraOptions);

			// Clean up the temporary audio stream (Daily will create its own)
			audioStream.getTracks().forEach(track => track.stop());

			console.log(`Daily initialized with microphone ${videoGranted ? 'and camera' : 'only'}`);
		} catch (error) {
			console.error('Failed to get microphone permission:', error);
			throw error;
		}
	}, [daily]);

	return requestPermissions;
};
