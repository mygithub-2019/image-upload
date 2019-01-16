<template>
    <div id="accordion">
      <div class="card">
        <div class="card-header">
          <a class="card-link" data-toggle="collapse" href="#collapseOne">
            {{ uploadImageTitle }}
          </a>
          <span class="bold" style="float: right"> Date: {{ new Date()}}</span>
        </div>
        <div id="collapseOne" class="collapse show" data-parent="#accordion">
          <div class="card-body">
            Upload an image file:
                <input type="file" id='file-upload' @change="previewImage" multiple>
                Total Files Uploaded: <span class="bold">{{ images.length }}</span>
                Total Files Size: <span class="bold">{{ formatBytes(getFileSize(this.images)) }}</span> 
          </div>
        </div>
      </div>
      <image-preview-section :images='images'></image-preview-section>
    </div>
</template>
<script>
import CONSTANTS from '../static/constants'
export default {
    data: function(){
        return{
            msg: 'Welcome to Your Vue.js App',
            images: [],
            justnow: "",
            size: 0,
            name: 'Satheesh',
            noImageUploadMsg: CONSTANTS.NO_IMAGE_UPLOAD_MESSAGE,
            uploadImageTitle: CONSTANTS.UPLOAD_IMAGE_TITLE,
            uploadErrorMsg: CONSTANTS.UPLOAD_IMAGE_ERROR_MESSAGE
        }
    },
  methods:{
    previewImage: function(event) {
            var input = event.target;
            var counter = input.files.length;
            // Ensure that you have a file before attempting to read it
            if(counter <= 5){
              for(var x = 0; x<counter; x++){
                if (input.files && input.files[x]) {
                    // create a new FileReader to read this image and convert to base64 format
                    //this.size += input.files[x].size;
                    var reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        //this.imageData = e.target.result;
                        this.images.push({url : e.target.result, size: input.files[x-1].size});
                        //document.getElementById("file-upload").value = "";
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[x]);
                    
                    this.justnow = counter;
                } 
              }
              //document.getElementById("file-upload").value = "";
            }else{
              document.getElementById("file-upload").value = "";
              alert('We are sorry, you can upload 5 images at a time.');
            }
        },
        deleteFile(index){
          this.images.splice(index, 1);
         // this.getFileSize(this.images);
          if(this.images.length == 0){
            this.justnow = 0;
            this.size = 0;
          }
          this.size = this.formatBytes(this.getFileSize(this.images));
          document.getElementById("file-upload").value = "";
        },
        getFileSize(data){
          var _size = 0;
          for (let value of data){
            _size += value['size'];
          }
          return _size;
        },
        formatBytes(bytes,decimals) {
          if(bytes == 0) return '0 Bytes';
          var k = 1024,
              dm = decimals <= 0 ? 0 : decimals || 2,
              sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
              i = Math.floor(Math.log(bytes) / Math.log(k));
          return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }
  }
}
</script>
<style lang="scss">

</style>


