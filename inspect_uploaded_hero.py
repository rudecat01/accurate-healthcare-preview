import cv2

path = r'C:/Users/dhruv/.gemini/antigravity/brain/d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2/.user_uploaded/media_1795535561983_b3001ff8.jpg'
img = cv2.imread(path)
print('Uploaded image shape:', img.shape)
