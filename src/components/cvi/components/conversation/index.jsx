import React, { useEffect, useCallback } from 'react';
import {
	DailyAudio,
	DailyVideo,
	useDevices,
	useLocalSessionId,
	useMeetingState,
	useScreenVideoTrack,
	useVideoTrack,
} from '@daily-co/daily-react';
import { MicSelectBtn, CameraSelectBtn } from '../device-select';
import { useLocalScreenshare } from '../../hooks/use-local-screenshare';
import { useReplicaIDs } from '../../hooks/use-replica-ids';
import { useCVICall } from '../../hooks/use-cvi-call';
import { AudioWave } from '../audio-wave';

import styles from './conversation.module.css';

const VideoPreview = React.memo(({ id }) => {
	const videoState = useVideoTrack(id);
	const widthVideo = videoState.track?.getSettings()?.width;
	const heightVideo = videoState.track?.getSettings()?.height;

	// Always default to vertical until we have confirmed dimensions showing width > height
	// This prevents the flash from horizontal to vertical when dimensions load
	const isVertical = widthVideo && heightVideo
		? widthVideo < heightVideo
		: true; // Default to vertical until we know actual dimensions

	return (
		<div
			className={`${styles.previewVideoContainer} ${isVertical ? styles.previewVideoContainerVertical : ''} ${videoState.isOff ? styles.previewVideoContainerHidden : ''}`}
		>
			<DailyVideo
				automirror
				sessionId={id}
				type="video"
				className={`${styles.previewVideo} ${isVertical ? styles.previewVideoVertical : ''} ${videoState.isOff ? styles.previewVideoHidden : ''}`}
			/>

			{/* Audio wave disabled - not needed for user experience
			<div className={styles.audioWaveContainer}>
				<AudioWave id={id} />
			</div>
			*/}
		</div>
	);
});

const PreviewVideos = React.memo(() => {
	const localId = useLocalSessionId();
	const { isScreenSharing } = useLocalScreenshare();
	const replicaIds = useReplicaIDs();
	const replicaId = replicaIds[0];

	return (
		<>
			{isScreenSharing && <VideoPreview id={replicaId} />}
			<VideoPreview id={localId} />
		</>
	);
});

const MainVideo = React.memo(({ isDisconnecting }) => {
	const replicaIds = useReplicaIDs();
	const localId = useLocalSessionId();
	const meetingState = useMeetingState();
	const videoState = useVideoTrack(replicaIds[0]);
	const screenVideoState = useScreenVideoTrack(localId);
	const isScreenSharing = !screenVideoState.isOff;
	// This is one-to-one call, so we can use the first replica id
	const replicaId = replicaIds[0];

	// Detect video orientation
	const videoTrack = videoState.track;
	const videoWidth = videoTrack?.getSettings()?.width;
	const videoHeight = videoTrack?.getSettings()?.height;
	const isVerticalVideo = videoWidth && videoHeight ? videoWidth < videoHeight : false;

	// Show "Ending call..." if disconnecting OR if there's a meeting error
	if (isDisconnecting || meetingState === 'error') {
		return (
			<div className={styles.waitingContainer}>
				<p>Ending call...</p>
			</div>
		);
	}

	// Show "Connecting..." only when there's no replica ID yet
	if (!replicaId) {
		return (
			<div className={styles.waitingContainer}>
				<p>Connecting...</p>
			</div>
		);
	}

	// Switching between replica video and screen sharing video
	return (
		<div
			className={`${styles.mainVideoContainer}
				${isScreenSharing ? styles.mainVideoContainerScreenSharing : ''}
				${isVerticalVideo ? styles.mainVideoContainerVertical : styles.mainVideoContainerHorizontal}`}
		>
			<DailyVideo
				automirror
				sessionId={isScreenSharing ? localId : replicaId}
				type={isScreenSharing ? 'screenVideo' : 'video'}
				className={`${styles.mainVideo}
				${isScreenSharing ? styles.mainVideoScreenSharing : ''}
				${isVerticalVideo ? styles.mainVideoVertical : styles.mainVideoHorizontal}
				${videoState.isOff ? styles.mainVideoHidden : ''}`}
			/>
		</div>
	);
});

export const Conversation = React.memo(({ onLeave, conversationUrl, creatorName, isDisconnecting, maxDurationMinutes, callStartTime, onGiftClick, showGiftTooltip }) => {
	const { joinCall, leaveCall } = useCVICall();
	const meetingState = useMeetingState();
	const { hasMicError } = useDevices();

	useEffect(() => {
		if (meetingState === 'error' || meetingState === 'left-meeting') {
			// Check if we're near max duration for credit expiration detection
			if (maxDurationMinutes && callStartTime) {
				const elapsed = Date.now() - callStartTime;
				const maxDurationMs = maxDurationMinutes * 60 * 1000;
				// Widened to 50% threshold - if past halfway point, assume credits expired
				if (elapsed >= maxDurationMs * 0.5) {
					console.log('Call ended past 50% of max duration, credits likely expired');
					onLeave('credits_expired');
					return;
				}
			}
			// Otherwise treat as normal error/disconnect
			if (meetingState === 'error') {
				onLeave('meeting_error');
			} else if (meetingState === 'left-meeting') {
				// This handles Safari's different disconnection behavior
				onLeave('meeting_ended');
			}
		}
	}, [meetingState, onLeave, maxDurationMinutes, callStartTime]);

	// Initialize call when conversation is available
	useEffect(() => {
		if (conversationUrl) {
			// Small delay to ensure Daily instance is ready
			const timer = setTimeout(() => {
				joinCall({ url: conversationUrl });
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [conversationUrl, joinCall]);

	const handleLeave = useCallback(() => {
		leaveCall();
		onLeave();
	}, [leaveCall, onLeave]);

	return (
		<div className={styles.container}>
			<div className={styles.videoContainer}>
				{hasMicError && (
					<div className={styles.errorContainer}>
						<p>Microphone access denied. Please check your browser settings in the top-left or bottom-left corner next to the URL bar, or close this tab and open a new one.</p>
					</div>
				)}

				{/* Main video */}
				<div className={styles.mainVideoContainer}>
					<MainVideo isDisconnecting={isDisconnecting} />
				</div>

				{/* Self view */}
				<div className={styles.selfViewContainer}>
					<PreviewVideos />
				</div>
			</div>

			<div className={styles.footer}>
				<div className={styles.footerControls}>
					<button type="button" className={styles.leaveButton} onClick={handleLeave}>
						<span className={styles.leaveButtonIcon}>
							<img
								src="/icons/exit.png"
								alt="Leave Call"
								className={styles.exitIcon}
							/>
						</span>
					</button>
					<MicSelectBtn />
					<CameraSelectBtn />
					{onGiftClick && (
						<div style={{ position: 'relative' }}>
							{/* Tooltip */}
							{showGiftTooltip && (
								<div
									style={{
										position: 'absolute',
										bottom: '100%',
										left: '50%',
										transform: 'translateX(-50%) translateY(-8px)',
										marginBottom: '0.5rem',
										backgroundColor: '#ec4899',
										color: 'white',
										padding: '0.5rem 1rem',
										borderRadius: '9999px',
										fontSize: '0.875rem',
										fontWeight: '600',
										whiteSpace: 'nowrap',
										boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
										zIndex: 1000,
										animation: 'bounceIn 0.5s ease-out'
									}}
								>
									Send me gift ❤️
									{/* Arrow pointing down */}
									<div
										style={{
											position: 'absolute',
											bottom: '-6px',
											left: '50%',
											transform: 'translateX(-50%)',
											width: 0,
											height: 0,
											borderLeft: '6px solid transparent',
											borderRight: '6px solid transparent',
											borderTop: '6px solid #ec4899'
										}}
									/>
								</div>
							)}
							<button
								type="button"
								onClick={onGiftClick}
								className={styles.giftButton}
								title="Send a gift"
								style={{
									width: '3rem',
									height: '3rem',
									borderRadius: '9999px',
									background: 'linear-gradient(to right, #ec4899, #a855f7)',
									border: 'none',
									backdropFilter: 'blur(4px)',
									cursor: 'pointer',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									transition: 'all 0.2s',
									boxShadow: showGiftTooltip
										? '0 0 30px rgba(236, 72, 153, 0.8), 0 0 60px rgba(236, 72, 153, 0.6), 0 6px 12px rgba(236, 72, 153, 0.6)'
										: '0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(236, 72, 153, 0.4), 0 4px 6px rgba(236, 72, 153, 0.5)'
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'scale(1.1)';
									e.currentTarget.style.boxShadow = '0 0 30px rgba(236, 72, 153, 0.8), 0 0 60px rgba(236, 72, 153, 0.6), 0 6px 12px rgba(236, 72, 153, 0.6)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'scale(1)';
									e.currentTarget.style.boxShadow = showGiftTooltip
										? '0 0 30px rgba(236, 72, 153, 0.8), 0 0 60px rgba(236, 72, 153, 0.6), 0 6px 12px rgba(236, 72, 153, 0.6)'
										: '0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(236, 72, 153, 0.4), 0 4px 6px rgba(236, 72, 153, 0.5)';
								}}
							>
								<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '1.25rem', height: '1.25rem', color: 'white' }}>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
								</svg>
							</button>
						</div>
					)}
				</div>
			</div>

			<DailyAudio />
		</div>
	);
});
