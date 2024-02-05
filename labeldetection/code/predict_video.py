import os
import cv2
from ultralytics import YOLO

# Define video paths
video_path = 'C:\\Users\\serge\\FinalYear\\LabelDetection\\code\\videos\\test.mp4'
video_path_out = 'C:\\Users\\serge\\FinalYear\\LabelDetection\\code\\videos\\test_out.mp4'

# Load the model
model_path = 'C:\\Users\\serge\\FinalYear\\LabelDetection\\runs\\detect\\train3\\weights\\last.pt'
model = YOLO(model_path)  # load a custom model

# Set the threshold for detection
threshold = 0.5

# Initialize video capture
cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print(f"Error opening video file at {video_path}")
    exit(1)

# Get video properties
fps = int(cap.get(cv2.CAP_PROP_FPS))
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# Initialize video writer
out = cv2.VideoWriter(video_path_out, cv2.VideoWriter_fourcc('m', 'p', '4', 'v'), fps, (frame_width, frame_height))

# Process video
ret, frame = cap.read()
while ret:
    # Perform inference
    results = model(frame)[0]

    # Processing results code would go here...

    # Write the frame with detections
    out.write(frame)

    # Read the next frame
    ret, frame = cap.read()

# Release resources
cap.release()
out.release()
cv2.destroyAllWindows()
