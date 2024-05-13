## What I Built

Welcome to Echo Diary, a cutting-edge personal diary app ingeniously crafted atop Netlify's robust Blob storage.

Echo Diary is more than just a diary; it's a secure vault for your thoughts, emotions, and memories, encrypted during transit for utmost privacy and security. 
Blobs are safe since they are encrypted while transit, reference
(https://docs.netlify.com/blobs/overview/#sensitive-data)

Key Features of Echo Diary:

## Mood Tracker
Ever wondered about your emotional trends? Our Mood Tracker doesn't just record your feelings using expressive emojis; it transforms them into insightful graphs. This visual journey through your emotional landscape can help you understand life's ups and downs and foster personal growth.

## Dynamic Entries
Echo Diary lets you capture life as it happens. Whether it’s a quick text, a snapshot of a moment, or an audio recording, you can store multiple entries per day. Browsing through your past entries isn't just a walk down memory lane; it's a deep dive into your personal evolution, helping you reflect on your most significant moments.

>Your Life, Encrypted, Secured, and Beautifully Plotted. Dive into Echo Diary today and start tracking your journey in a way that's secure, intuitive, and profoundly personal.


## Demo

### Dashboard
![Dashboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/89a0a79fyncq4xjmiudh.png)



### Add Entry
![Add Entry](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m8fiqk2t03wm6po39r85.png)


### View Entries
![View Entires](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l8hwrs5u46a3yc82rfxt.png)


### Loom Video explaining the project
https://www.loom.com/share/a08f7b7c49f94322aa35d45d52fdd60d?sid=4073a958-5125-4787-b59e-1100ac6db98d

## Tech Stack
- `Nuxt`
- `Netlify` for deploys, blob storage, image optimisations (using Nuxt Image under the hood)
- `Kinde` for Authentication
- `Supabase` for file storage



## Platform Primitives
Leveraged Netlify blobs as a database, used it to store user entries and moods.

`entries_uid`: Every diary entry is assigned a unique identifier (entries_uid), which helps in efficiently storing and retrieving the diary entries from the blob storage. This UID not only ensures the integrity of the data but also facilitates easy access and management.

`moods_uid`: Each mood entry is similarly tagged with a unique identifier (moods_uid), allowing the Mood Tracker feature to quickly aggregate and analyze mood data over time.



![Arch](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v3l61090ltgz5vw9vgg9.png)


Entries Blobs
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8g9h0evl223hx09sww4b.png)



Mood Blobs
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fj3m5abcbbp0n7cw41d7.png)



Leveraged Netlify Image CDN to power the image transformations that happens inside the `view-entries` tab.






