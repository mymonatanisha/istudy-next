The BlogContentEditor provides an Insert Image control above the existing HTML textarea. It uploads the selected image through the protected admin endpoint and inserts the resulting image HTML into the content field.

Before production use on Heroku, move the storage implementation to persistent object storage because dyno filesystems are ephemeral.
