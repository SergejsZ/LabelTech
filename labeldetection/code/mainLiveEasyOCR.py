import cv2
import easyocr
import matplotlib.pyplot as plt

# instantiate text detector
reader = easyocr.Reader(['en'], gpu=True)

# Keywords to look for, not necessarily in order
keywords = ["PORTOBELLO", "MUSHROOMS", "Origin", "N.IRELAND"]

# Start video capture from the laptop's camera
cap = cv2.VideoCapture(0)  # '0' is usually the default ID for the built-in camera

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame")
        break

    # detect text on the current frame
    results = reader.readtext(frame)

    # Initialize found_keywords for each frame
    found_keywords = {keyword: False for keyword in keywords}

    for result in results:
        bbox, text, score = result
        text_upper = text.upper()

        # Check for each keyword in the detected text
        for keyword in keywords:
            if keyword.upper() in text_upper:
                found_keywords[keyword] = True

        # Draw bounding box and text on the frame for visualization
        cv2.rectangle(frame, (int(bbox[0][0]), int(bbox[0][1])), (int(bbox[2][0]), int(bbox[2][1])), (0, 255, 0), 2)
        cv2.putText(frame, text, (int(bbox[0][0]), int(bbox[0][1] - 10)), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Display the frame with bounding boxes and detected texts
    cv2.imshow('Frame', frame)

    # Check if all keywords were found
    if all(found_keywords.values()):
        print("Correct label")
    else:
        print("Wrong label")

    # Break the loop with the 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything is done, release the capture
cap.release()
cv2.destroyAllWindows()
