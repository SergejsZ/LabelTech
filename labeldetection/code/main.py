from ultralytics import YOLO

model = YOLO('MMLabelModel.pt')

results = model(source=0, show=True, conf=0.6 )  # Inference on video stream (webcam)