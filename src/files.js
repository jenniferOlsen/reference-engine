import { Dropbox } from 'dropbox';

const accessToken = process.env.REACT_APP_DROPBOX_TOKEN;

const dbx = new Dropbox({  
  accessToken,  
  fetch  
});

export const getFiles = () => { 
    dbx.filesListFolder({  
    path: '/Poses'  
  }).then(response => {
       dbx.filesGetThumbnailBatch(
         {    
          entries: response.entries.map(function(entry){
            return {
              path: entry.id,
              format : {'.tag': 'jpeg'},
              size: { '.tag': 'w2048h1536'},
              mode: { '.tag': 'strict' }
            }
        })
      }).then(response => {
        console.log(response)
          // console.log(response.entries[0].thumbnail)

        })
  })
}

  


