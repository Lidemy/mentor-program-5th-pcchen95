export const cssTemplate = '.card { margin-top: 12px; }'

export const formTemplate = `
  <div>
    <form class="add-comment-form mt-4">
      <div class="mb-3">
        <label for="form-nickname" class="form-label">暱稱</label>
        <input type="text" name="nickname" class="form-control" id="form-nickname">
      </div>
      <div class="mb-3">
        <label for="content-textarea" class="form-label">留言內容</label>
        <textarea name="content" class="form-control" id="content-textarea" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">送出</button>
    </form>
    <div class="comments">
    </div>
    <div class="d-grid gap-2 mt-4 mb-4">
      <button class="btn btn-outline-secondary read-more-btn">READ MORE</button>
    </div>
  </div>`

export const getForm = (className, commentsClassName, btnClassName) =>
  `<div>
    <form class="${className} mt-4">
      <div class="mb-3">
        <label class="form-label">暱稱</label>
        <input type="text" name="nickname" class="form-control" >
      </div>
      <div class="mb-3">
        <label class="form-label">留言內容</label>
        <textarea name="content" class="form-control" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">送出</button>
    </form>
    <div class="${commentsClassName}">
    </div>
    <div class="d-grid gap-2 mt-4 mb-4">
      <button class="${btnClassName} btn btn-outline-secondary">READ MORE</button>
    </div>
  </div>`
