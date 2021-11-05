import os

for i, file in enumerate(os.listdir("./assets")):
    #print(i, file)
    os.rename(f"./assets/{file}", f"./assets/image{76-i}.jpg")
    