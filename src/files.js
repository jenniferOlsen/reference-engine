import { Dropbox } from 'dropbox';

const accessToken = process.env.REACT_APP_DROPBOX_TOKEN;

const dbx = new Dropbox({  
  accessToken,  
  fetch  
});

export const getFiles = () => { 
  let files = [];
    dbx.filesListFolder({  
    path: '',
    recursive: true,
    include_non_downloadable_files: false,  
  }).then(response => {
       dbx.filesGetThumbnailBatch(
         {    
          entries: response.entries.map(function(entry){
            return {
              path: entry.id,
              format : 'jpeg',
              size: 'w2048h1536',
            }
        })
      }).then(response => {
        console.log(response)
        return files = response.entries;
        })
  })
}

  


