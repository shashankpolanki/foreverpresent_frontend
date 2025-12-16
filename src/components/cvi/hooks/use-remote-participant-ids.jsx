import { useParticipantIds } from '@daily-co/daily-react';

export const useRemoteParticipantIDs = () => {
	const remoteParticipantIds = useParticipantIds({ filter: 'remote' });

	return remoteParticipantIds;
};
