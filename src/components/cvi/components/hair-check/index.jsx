import React, { memo, useEffect, useState } from 'react';
import { DailyVideo, useDaily } from '@daily-co/daily-react';
import { CameraSelectBtn, MicSelectBtn } from '../device-select';
import { useStartHaircheck } from '../../hooks/use-start-haircheck';
import { useLocalCamera } from '../../hooks/use-local-camera';

import styles from './hair-check.module.css';

const JoinBtn = ({ onClick, disabled, className, loading, permissionsGranted, permissionsLoading, languageOverride }) => {
	const isSpanish = languageOverride === 'spanish';

	let buttonText = isSpanish ? 'Unirse a la videollamada' : 'Join Video Call';
	let showArrow = false;
	let showSpinner = false;

	if (loading) {
		buttonText = isSpanish ? 'Uniéndose...' : 'Joining...';
		showSpinner = true;
	} else if (permissionsLoading) {
		buttonText = isSpanish ? 'Conectando micrófono...' : 'Connecting microphone...';
		showSpinner = true;
	} else if (!permissionsGranted) {
		buttonText = isSpanish ? 'Habilita tu micrófono' : 'Enable Microphone';
	} else {
		// Show arrow when ready to join
		showArrow = true;
	}

	return (
		<button
			className={`${styles.buttonJoin} ${className || ''}`}
			type="button"
			onClick={onClick}
			disabled={disabled || loading || permissionsLoading}
		>
			<div className={styles.buttonJoinInner}>
				{showSpinner && (
					<svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				)}
				{buttonText}
				{showArrow && (
					<svg
						className={`${styles.buttonArrow} animate-bounce-x`}
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13 7l5 5m0 0l-5 5m5-5H6"
						/>
					</svg>
				)}
			</div>
		</button>
	);
};

export const HairCheck = memo(({ isJoinBtnLoading = false, onJoin, onCancel, conversationUrl, languageOverride = null }) => {
	const daily = useDaily();
	const { localSessionId, isCamMuted } = useLocalCamera();
	const isSpanish = languageOverride === 'spanish';
	const [isCancelling, setIsCancelling] = useState(false);
	const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds

	const {
		isPermissionsPrompt,
		isPermissionsLoading,
		isPermissionsGranted,
		isPermissionsDenied,
		requestPermissions,
	} = useStartHaircheck();

	// Request permissions when component mounts
	useEffect(() => {
		requestPermissions();
	}, [requestPermissions]);

	// Countdown timer
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					onCancelHairCheck();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const onCancelHairCheck = () => {
		setIsCancelling(true);
		if (daily) {
			daily.leave();
		}
		onCancel?.();
	};

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	const getDescription = () => {
		if (isPermissionsPrompt) {
			return isSpanish ? '¡Asegúrate de que tu micrófono y cámara estén listos!' : 'Make sure your microphone and camera are ready!';
		}
		if (isPermissionsLoading) {
			return isSpanish ? 'Configurando tu micrófono y cámara...' : 'Setting up your microphone and camera...';
		}
		if (isPermissionsDenied) {
			const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
			const isChrome = /chrome/i.test(navigator.userAgent) && !/edge/i.test(navigator.userAgent);

			if (isSpanish) {
				if (isChrome) {
					return 'Se requiere acceso al micrófono. Haz clic en el ícono en tu barra de direcciones para permitir permisos, luego actualiza la página.';
				} else if (isSafari) {
					return 'Se requiere acceso al micrófono. Ve a Safari > Configuración para este sitio web > permitir Micrófono, luego actualiza.';
				}
				return 'Se requiere acceso al micrófono. Verifica la configuración de tu navegador para permitir permisos para este sitio, luego actualiza la página.';
			} else {
				if (isChrome) {
					return 'Microphone access is required. Click the icon in your address bar to allow permissions, then refresh the page.';
				} else if (isSafari) {
					return 'Microphone access is required. Go to Safari > Settings for This Website > allow Microphone, then refresh.';
				}
				return 'Microphone access is required. Check your browser settings to allow permissions for this site, then refresh the page.';
			}
		}
		return isSpanish ? "¡Prepárate!" : "Get Ready!";
	};
	return (
		<div className={styles.haircheckBlock}>
			{/* Timer at top */}
			<div className={styles.timerContainer}>
				<span className={styles.timerText}>
					{isSpanish ? `Tiempo restante de espera: ${formatTime(timeRemaining)}` : `Waitroom Time Remaining: ${formatTime(timeRemaining)}`}
				</span>
			</div>

			{/* Placeholder always rendered as background */}
			<div className={styles.haircheckUserPlaceholder}>
				<span className={styles.haircheckUserIcon}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="88"
						height="89"
						viewBox="0 0 88 89"
						fill="none"
						aria-label="Haircheck User"
						role="img"
					>
						<path
							d="M44 48.6406C17.952 48.6406 8.80005 61.8406 8.80005 70.6406V83.8406H79.2001V70.6406C79.2001 61.8406 70.0481 48.6406 44 48.6406Z"
							fill="url(#paint0_linear_7135_21737)"
						/>

						<path
							d="M44 44.2406C54.9352 44.2406 63.7999 35.3759 63.7999 24.4406C63.7999 13.5054 54.9352 4.64062 44 4.64062C33.0647 4.64062 24.2 13.5054 24.2 24.4406C24.2 35.3759 33.0647 44.2406 44 44.2406Z"
							fill="url(#paint1_linear_7135_21737)"
						/>

						<defs>
							<linearGradient
								id="paint0_linear_7135_21737"
								x1="36.5001"
								y1="43"
								x2="44.0001"
								y2="97.5"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="white" />
								<stop offset="1" stopColor="white" stopOpacity="0" />
							</linearGradient>
							<linearGradient
								id="paint1_linear_7135_21737"
								x1="44"
								y1="4.64062"
								x2="44"
								y2="44.2406"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="white" />
								<stop offset="1" stopColor="white" stopOpacity="0" />
							</linearGradient>
						</defs>
					</svg>
				</span>
			</div>

			{/* Video renders on top when permissions granted - show regardless of camera mute state */}
			{isPermissionsGranted && localSessionId && (
				<DailyVideo
					type="video"
					sessionId={localSessionId}
					mirror
					className={`${styles.dailyVideo} ${isCamMuted ? styles.dailyVideoHidden : ''}`}
				/>
			)}

			<div className={styles.haircheckSidebar}>
				<div className={styles.haircheckSidebarContent}>
					{isPermissionsDenied ? (
						<button
							type="button"
							onClick={onCancelHairCheck}
							disabled={isCancelling}
							className={`${styles.buttonCancel} ${styles.buttonCancelMobile}`}
						>
							{isCancelling ? (isSpanish ? 'Cancelando...' : 'Cancelling...') : (isSpanish ? 'Cancelar' : 'Cancel')}
						</button>
					) : (
						<JoinBtn
							loading={isJoinBtnLoading}
							disabled={!isPermissionsGranted}
							permissionsGranted={isPermissionsGranted}
							permissionsLoading={isPermissionsLoading}
							languageOverride={languageOverride}
							className={styles.buttonJoinMobile}
							onClick={onJoin}
						/>
					)}
					<div />
					<div className={styles.haircheckContent}>
						<div className={styles.haircheckDescription}>{getDescription()}</div>
						{isPermissionsDenied ? (
							<button
								type="button"
								onClick={onCancelHairCheck}
								disabled={isCancelling}
								className={styles.buttonCancel}
							>
								{isCancelling ? (isSpanish ? 'Cancelando...' : 'Cancelling...') : (isSpanish ? 'Cancelar' : 'Cancel')}
							</button>
						) : (
							<JoinBtn
								loading={isJoinBtnLoading}
								disabled={!isPermissionsGranted}
								permissionsGranted={isPermissionsGranted}
								permissionsLoading={isPermissionsLoading}
								languageOverride={languageOverride}
								className={styles.buttonJoinDesktop}
								onClick={onJoin}
							/>
						)}
					</div>
					<div className={styles.haircheckControls}>
						<MicSelectBtn />
						<CameraSelectBtn />
					</div>
				</div>
			</div>
		</div>
	);
});

HairCheck.displayName = 'HairCheck';
