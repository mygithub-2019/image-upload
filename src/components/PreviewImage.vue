<template>
    <div>
        <div class="image-preview" >
            <div v-for='(imageData, index) in images' :key="index" style="float: left;">
            <img class="preview" v-bind:src="imageData['url']">
            <span @click="deleteFile(index)" class="deleteFile">{{ index }}</span>
            </div>
            <div v-if="images.length == 0">
                <p>{{ noImageUploadMsg }}</p>
            </div>
            <!-- <h1>{{ myName[0] }}</h1> -->
        </div>
    </div>
</template>
<script>
import CONSTANTS from '../static/constants'
export default {
    props: ['images'],
    data: function(){
        return {
            noImageUploadMsg: CONSTANTS.NO_IMAGE_UPLOAD_MESSAGE
        }
    },
    methods: {
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

