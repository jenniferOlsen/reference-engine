import { Dropbox } from 'dropbox';

const accessToken = process.env.REACT_APP_DROPBOX_TOKEN;

const dbx = new Dropbox({  
  accessToken,  
  fetch  
});

// Helper function to filter returned array 
// Checks for any text properties (in this case, 'success')
function filterByValue(array, string) {
  return array.filter(item =>
    Object.keys(item).some(text => String(item[text]).includes(string)));
}

export let files = [];
export const getFiles = () => { 
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
        let data = response.entries;
        return files = filterByValue(data, 'success')
      })
  })
}

  


