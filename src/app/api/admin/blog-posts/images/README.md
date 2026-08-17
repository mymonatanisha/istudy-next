# Blog image uploads

Images uploaded by the Blog Admin are stored under `public/uploads/blog` and are served at `/uploads/blog/<filename>`.

This local filesystem storage is suitable only when the deployment filesystem is persistent. Heroku dynos use an ephemeral filesystem, so production deployments should replace this storage with persistent object storage (for example S3-compatible storage) before relying on uploaded images in production.
