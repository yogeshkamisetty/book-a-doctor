// Agora RTC for Video Consultations
// FREE TIER: 10,000 free minutes/month

import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';

let agoraClient: IAgoraRTCClient | null = null;
let localAudioTrack: IMicrophoneAudioTrack | null = null;
let localVideoTrack: ICameraVideoTrack | null = null;

export const agoraService = {
  // Initialize Agora client
  initializeClient: async (): Promise<IAgoraRTCClient> => {
    if (agoraClient) return agoraClient;

    AgoraRTC.setLogLevel(4);
    agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    return agoraClient;
  },

  // Join channel
  joinChannel: async (
    token: string,
    channelName: string,
    uid: string | number | null
  ): Promise<void> => {
    if (!agoraClient) throw new Error('Agora client not initialized');
    
    const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID;
    if (!appId) throw new Error('Agora App ID not configured');

    await agoraClient.join(appId, channelName, token, uid);
  },

  // Create local audio track
  createAudioTrack: async (): Promise<IMicrophoneAudioTrack> => {
    localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    return localAudioTrack;
  },

  // Create local video track
  createVideoTrack: async (): Promise<ICameraVideoTrack> => {
    localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    return localVideoTrack;
  },

  // Publish tracks
  publishTracks: async (
    audioTrack: IMicrophoneAudioTrack,
    videoTrack: ICameraVideoTrack
  ): Promise<void> => {
    if (!agoraClient) throw new Error('Agora client not initialized');
    await agoraClient.publish([audioTrack, videoTrack]);
  },

  // Unpublish tracks
  unpublishTracks: async (): Promise<void> => {
    if (!agoraClient) throw new Error('Agora client not initialized');
    if (localAudioTrack && localVideoTrack) {
      await agoraClient.unpublish([localAudioTrack, localVideoTrack]);
    }
  },

  // Leave channel
  leaveChannel: async (): Promise<void> => {
    if (!agoraClient) throw new Error('Agora client not initialized');

    // Stop and close tracks
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
      localAudioTrack = null;
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
      localVideoTrack = null;
    }

    await agoraClient.leave();
    agoraClient = null;
  },

  // Subscribe to remote user
  subscribeToRemoteUser: async (
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video'
  ): Promise<void> => {
    if (!agoraClient) throw new Error('Agora client not initialized');
    await agoraClient.subscribe(user, mediaType);
  },

  // Get local video track
  getLocalVideoTrack: (): ICameraVideoTrack | null => localVideoTrack,

  // Get Agora client
  getClient: (): IAgoraRTCClient | null => agoraClient,
};
