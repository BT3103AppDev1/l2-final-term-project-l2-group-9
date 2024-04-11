<template>
    <div class="profileSegment">
        <div class="profile-icon">
            <img src="@/assets/images/businessman.jpg" alt="Profile Icon" />
        </div>
        <div class="profile-details">
            <h1>{{ this.userName }}</h1>
            <div class="fileUpload">
                <p>Upload Resume :</p>
                <input
                    type="file"
                    name="file"
                    accept="application/pdf"
                    @change="addFileToStorage"
                />
            </div>
            <div v-if="this.fileUrl">
                <a
                    :href="this.fileUrl"
                    class="uploadResumeButton"
                    target="_blank"
                    >View Resume</a
                >
            </div>
        </div>
    </div>
</template>

<script>
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
        };
    },
    async created() {
        this.fetchDocumentFromStorage();
    },
    methods: {
        async addFileToStorage() {
            // Delete the existing document from storage
            const listRef = ref(storage);
            listAll(listRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        getMetadata(itemRef).then((metadata) => {
                            if (
                                metadata.customMetadata.userId === this.userId
                            ) {
                                deleteObject(itemRef).then(() => {
                                    console.log(
                                        "Document deleted successfully",
                                    );
                                });
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error deleting documents: ", error);
                });
            const file = document.querySelector("input[type=file]").files[0];
            const fileRef = ref(storage, file.name);
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
                        this.fileUrl = url;
                    });
                },
            );
        },
        async fetchDocumentFromStorage() {
            // Retrieve all documents from storage and filter the documents based on userId
            const listRef = ref(storage);
            listAll(listRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        getMetadata(itemRef).then((metadata) => {
                            if (
                                metadata.customMetadata.userId === this.userId
                            ) {
                                // Set the document URL to the documentUrl variable
                                getDownloadURL(itemRef).then((url) => {
                                    this.fileUrl = url;
                                });
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error fetching documents: ", error);
                });
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
}
.profile-icon img {
    width: 152px;
    height: 152px;
    margin: 24px;
    border: 1px solid #ffffff;
    border-radius: 50%;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
    background: radial-gradient(circle, #000000 0%, #333333 100%);
}
.profile-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 24px;
}
.profile-details h1 {
    font-size: 48px;
    font-weight: 700;
}
.fileUpload {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 24px;
    padding-bottom: 16px;
    margin-left: 4px;
}
.fileUpload input {
    margin-left: 8px;
}
.uploadResumeButton {
    background-color: #526d82;
    color: white;
    text-decoration: none;
    border-radius: 12px;
    padding: 8px 16px;
    margin-right: 4px;
}
</style>
