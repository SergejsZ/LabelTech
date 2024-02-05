from ultralytics import YOLO

# Load a model
model = YOLO("yolov8n.yaml") # build a new model from scratch


# Use the model
results = model.train(data="C:\\Users\\serge\\FinalYear\\LabelDetection\\code\\config.yaml", epochs=20)