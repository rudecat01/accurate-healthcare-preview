import cv2

path = r'C:/Users/dhruv/.gemini/antigravity/brain/d929d5e8-1ca6-4dcf-802e-1bdcbb6c73a2/.user_uploaded/media_1795536346789_43b17ef1.jpg'
img = cv2.imread(path)
print('New uploaded image shape:', img.shape)
