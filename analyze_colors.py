from PIL import Image
import collections

# Analyze logo1.png
img_path = 'img/logo1.png'
img = Image.open(img_path).convert('RGB')
img_resized = img.resize((200, 200))
pixels = list(img_resized.getdata())

# Remove background white
non_white = [p for p in pixels if not (p[0] > 240 and p[1] > 240 and p[2] > 240)]
counter = collections.Counter(non_white)
top = counter.most_common(20)

print(f'logo1.png size: {img.size}')
print('Top brand colors (non-white):')
for color, count in top:
    pct = count/len(non_white)*100 if non_white else 0
    if pct > 0.3:
        r, g, b = color
        hex_color = f'#{r:02x}{g:02x}{b:02x}'
        print(f'  rgb({r},{g},{b}) {hex_color} = {pct:.1f}%')

# Analyze the main LOGOOK
print()
img2_path = 'img/LOGOOK.jfif'
img2 = Image.open(img2_path).convert('RGB')
img2_resized = img2.resize((200, 200))
pixels2 = list(img2_resized.getdata())

non_white2 = [p for p in pixels2 if not (p[0] > 240 and p[1] > 240 and p[2] > 240)]
counter2 = collections.Counter(non_white2)
top2 = counter2.most_common(10)

print(f'LOGOOK.jfif size: {img2.size}')
print('Top non-white colors:')
for color, count in top2:
    pct = count/len(non_white2)*100 if non_white2 else 0
    if pct > 0.3:
        r, g, b = color
        hex_color = f'#{r:02x}{g:02x}{b:02x}'
        print(f'  rgb({r},{g},{b}) {hex_color} = {pct:.1f}%')
