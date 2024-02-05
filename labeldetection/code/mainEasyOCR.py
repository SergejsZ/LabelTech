import cv2
import easyocr
import matplotlib.pyplot as plt

# read image
image_path = 'C:\\Users\\serge\\FinalYear\\LabelDetection\\code\\photo_5899881456963012143_y.jpg'

img = cv2.imread(image_path)

# instantiate text detector
reader = easyocr.Reader(['en'], gpu=False)

# detect text on image
results = reader.readtext(img)

# Write the detected texts into a file
with open('detected_texts.txt', 'w') as f:
    for result in results:
        bbox, text, score = result
        f.write(f"{text}\n")

        # Draw bounding box and text on the image for visualization
        cv2.rectangle(img, (int(bbox[0][0]), int(bbox[0][1])), (int(bbox[2][0]), int(bbox[2][1])), (0, 255, 0), 2)
      #  cv2.putText(img, text, (int(bbox[0][0]), int(bbox[0][1] - 10)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

# Display the image
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.show()

# Keywords to look for, not necessarily in order
keywords = ["PORTOBELLO", "MUSHROOMS", "Origin", "N.IRELAND", "200g"]
found_keywords = {keyword: False for keyword in keywords}

# Now, read the content of the file to search for each keyword
with open('detected_texts.txt', 'r') as f:
    content = f.read().upper()  # Convert content to upper case to make the search case-insensitive

    # Check for each keyword in the content
    for keyword in keywords:
        if keyword.upper() in content:  # Check each keyword in upper case
            found_keywords[keyword] = True

# Check if all keywords were found and print which ones are missing
all_found = True
missing_keywords = []
for keyword, found in found_keywords.items():
    if not found:
        all_found = False
        missing_keywords.append(keyword)

if all_found:
    print("Correct label")
else:
    print("Wrong label. Missing:", ", ".join(missing_keywords))
