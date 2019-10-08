// generator.js 引入概念

//章节


//串行加载 串行显示
async function showStory(storyUrl){
  var story = await getJSON(storyUrl)

  for (var chapterUrl of story.chapterUrl){
    var chapter = await getJSON(chapterUrl)
    addContentToPage(chapter)
  }
}


//并行加载 串行显示
async function showStory(storyUrl){
  var story = await getJSON(storyUrl)

  var chapterPromises = story.chapterUrls.map(getJSON)

  for (var chapterPromise of story.chapterPromises){
    var chapter = await chapterPromise
    addContentToPage(chapter)
  }
}


async function listAllFiles(path) {
  var res = []
  var stat = await fs.stat(path)
}
