<template>
    <div class="profileSegment">
        <div class="profile-icon">
            <label for="profilePictureUpload" class="profile-picture-label">
                    <img :src="profileUrl" alt="Profile Icon" class="profile-picture" />
                    <div class="edit-icon">
                      <font-awesome-icon :icon="['fas', 'pen']" alt="Edit Icon" />
                    </div>
                  </label>
            <input type="file" id="profilePictureUpload" @change="addPictureToStorage" style="display: none" />
        </div>
        <div class="profile-details">
            <h1>{{ this.userName }}</h1>
            <div class="fileUpload">
                <p>Upload Resume :</p>
                <button @click="triggerFileInput" class="custom-file-upload">
                  Choose file
                </button>
                <input type="file" id="file" name="file" ref="fileInput" accept="application/pdf" @change="addFileToStorage($event)" style="display: none" />
                <span v-if="fileName">{{ fileName }}</span>
                <span v-else>No file chosen</span>
            </div>
        </div>
    </div>
</template>

<script>
import defaultImage from "@/assets/images/Default_pfp.svg.png";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    listAll,
    getMetadata,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

const storage = getStorage();

export default {
    name: "ProfileDetails",
    props: {
        userName: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            fileUrl: "",
            profileUrl: "", //need changes here
            fileName: "",
        };
    },
    async created() {
        this.fetchDocumentFromStorage();
        this.fetchPictureFromStorage();
    },

    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click(); // trigger the hidden file input
        },
        async addFileToStorage(event) {
            const file = event.target.files[0];
            if (!file) {
                console.log("No file selected");
                return;
            }
            this.fileName = file.name //update file name
            console.log(this.fileName + "yes")
            // Delete the existing document from storage
            const listRef = ref(storage, `Resumes/${this.userId}`);
            listAll(listRef)
                .then((res) => {
                    console.log(res);
                    res.items.forEach((itemRef) => {
                        getMetadata(itemRef).then((metadata) => {
                            if (
                                metadata.customMetadata &&
                                metadata.customMetadata.userId === this.userId
                            ) {
                                deleteObject(itemRef).then(() => {
                                    console.log("Document deleted successfully");
                                });
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error deleting documents: ", error);
                });

            const filePath = `Resumes/${this.userId}/${file.name}`;
            const fileRef = ref(storage, filePath);
            const metadata = {
                customMetadata: {
                    userId: this.userId,
                    fileName: file.name,
                },
            };
            const uploadTask = uploadBytesResumable(fileRef, file, metadata);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    console.log("Error uploading document: ", error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log("Document uploaded successfully, available at", url);
                        this.fileUrl = url;
                        this.fileName = file.name;
                        window.location.reload();
                    });
                }
            );
        },

        async fetchDocumentFromStorage() {
            const listRef = ref(storage, `Resumes/${this.userId}`);
            listAll(listRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        getMetadata(itemRef).then((metadata) => {
                            if (metadata.customMetadata && metadata.customMetadata.userId === this.userId) {
                                getDownloadURL(itemRef).then((url) => {
                                    this.fileUrl = url;
                                    this.fileName = metadata.customMetadata.fileName; // gte the fileName stored in metadata
                                });
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error fetching documents: ", error);
                });
        },

        async addPictureToStorage() {
            // Delete the existing document from storage
            const listRef = ref(storage, `profilePictures/${this.userId}`);
            listAll(listRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        getMetadata(itemRef).then((metadata) => {
                            if (metadata.customMetadata.userId === this.userId) {
                                deleteObject(itemRef).then(() => {
                                    console.log("Document deleted successfully");
                                });
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error deleting documents: ", error);
                });
            const file = document.querySelector("input[type=file]").files[0];
            const filePath = `profilePictures/${this.userId}/${file.name}`;
            const fileRef = ref(storage, filePath);
            const metadata = {
                customMetadata: {
                    userId: this.userId,
                },
            };
            const uploadTask = uploadBytesResumable(fileRef, file, metadata);
            // Change the state of the fileUrl variable to the new document URL
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    console.log("Error uploading document: ", error);
                },
                () => {
                    console.log("Document uploaded successfully");
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        this.profileUrl = url;
                        const newProfileData = {
                            profileUrl: url,
                        };
                        this.$store.dispatch("setUserProfile", newProfileData);
                    });
                }
            );
        },

        async fetchPictureFromStorage() {
            // Retrieve all documents from storage and filter the documents based on userId
            const listRef = ref(storage, `profilePictures/${this.userId}`);
            let pictureFound = false;
            listAll(listRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        getMetadata(itemRef).then((metadata) => {
                            if (metadata.customMetadata.userId === this.userId) {
                                // Set the document URL to the documentUrl variable
                                getDownloadURL(itemRef).then((url) => {
                                    this.profileUrl = url;
                                    pictureFound = true;
                                });
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error fetching documents: ", error);
                    this.profileUrl = defaultImage; // Set to default URL if error as fallback
                });
            if (!pictureFound) {
                this.profileUrl = defaultImage; // Set to default URL if no document is found
            }
        },
    },
};
</script>

<style scoped>
.profileSegment {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: black;
    font-size: 16px;
    font-weight: 500;
    margin-left: 2vw;
}

.profile-icon {
    margin-top: 40px;
}

.profile-picture-label {
    position: relative;
    cursor: pointer;
    display: inline-block;
}

.profile-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 30px;
    margin-top: 50px;
}

.profile-details h1 {
    font-size: 48px;
    font-weight: 700;
}

.fileUpload {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 16px;
    margin-left: 4px;
    font-family: "Poppins", sans-serif, Helvetica;
}

.fileUpload input {
    margin-left: 8px;
    font-family: "Poppins", sans-serif, Helvetica;
    font-size: 14px;
}

.uploadResumeButton {
    background-color: #526d82;
    color: white;
    text-decoration: none;
    border-radius: 12px;
    padding: 8px 16px;
    margin-right: 4px;
}

.profile-picture-label {
    cursor: pointer;
    /* Change the cursor to indicate it's clickable */
}

.profile-picture {
    width: 200px;
    /* Maintain width */
    height: 200px;
    /* Maintain height */
    border-radius: 50%;
    /* Circular image */
    object-fit: cover;
    /* Prevents stretching */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    /* Subtle shadow for depth */
    transition: transform 0.3s ease, opacity 0.3s ease;
    /* Smooth transition for scale and opacity */
}

.profile-picture-label:hover .profile-picture {
    opacity: 0.8;
    /* Slightly see-through when hovered */
    transform: scale(1.05);
    /* Slight zoom effect on hover */
}

.edit-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    /* Start invisible */
    transition: opacity 0.3s ease;
}

.profile-picture-label:hover .edit-icon {
    opacity: 1;
    /* Fully visible on hover */
}

.custom-file-upload {
    margin-left: 10px;
    margin-right: 10px;
}
</style>
