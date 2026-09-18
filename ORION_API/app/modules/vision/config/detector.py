import mediapipe as mp


def criar_detector(caminho_modelo, callback):
	base_options = mp.tasks.BaseOptions(model_asset_path=caminho_modelo)

	options = mp.tasks.vision.HandLandmarkerOptions(
		base_options=base_options,
		running_mode=mp.tasks.vision.RunningMode.LIVE_STREAM,
		num_hands=1,
		min_hand_detection_confidence=0.8,
		min_hand_presence_confidence=0.8,
		min_tracking_confidence=0.8,
		result_callback=callback,
	)

	return mp.tasks.vision.HandLandmarker.create_from_options(options)
