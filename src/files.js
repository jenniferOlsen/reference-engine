import { Dropbox } from 'dropbox';
import { filterByValue } from './utlis';

const accessToken = process.env.REACT_APP_DROPBOX_TOKEN;

const dbx = new Dropbox({  
  accessToken,  
  fetch  
});

export let files = [];
export let categories = [];

export const getCategories = async () => {
    await dbx.filesListFolder({
    path: '',
    recursive: false,
  }).then(response => {
    return categories = filterByValue(response.entries, 'folder')
  })
}

export const getFiles = async (path) => { 
  if (!path || path.length < 1) {
    return
  } 
  if (path.length > 0) {
    path.forEach(item => {
      let cat = item
      if ( cat === 'all') {
        path = ''
        filesData(path)
      } else {
          path = `/${cat}`
          filesData(path)
      }
    })
  } 
}

const filesData = async(path) => {
  dbx.filesListFolder({  
    path: path,
    recursive: true,
    include_non_downloadable_files: false,  
    limit: 25 // thumbnail batch limit imposed by api
  }).then( (response) => {
    processFiles(response.entries)
    if (response.has_more) {
      getMoreFiles(response.cursor, more => processFiles(more.entries))
    }
  })
}

const processFiles = async(response) => {
  dbx.filesGetThumbnailBatch(
  {    
    entries: response.map(function(entry){
      return {
        path: entry.id,
        format : 'jpeg',
        size: 'w2048h1536',
      }
    })
  }).then(response => {
    let data = response.entries;
    let filtered = filterByValue(data, 'success')
    return files = files.concat(filtered)
  })
}

const getMoreFiles = async (cursor, callback) => {  
  const response = await dbx.filesListFolderContinue({ cursor }) 
  if (callback) callback(response)
  if (response.has_more) {  
      // if there are more files, call getMoreFiles recursively,  
      // providing the same callback.  
      await getMoreFiles(response.cursor, callback)  
    }  
}
