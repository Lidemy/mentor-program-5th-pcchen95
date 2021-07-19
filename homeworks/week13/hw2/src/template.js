export const cssTemplate = '.card { margin-top: 12px; }'

export const getForm = (siteKey) =>
  `<div>
    <form class="${siteKey}-add-comment-form mt-4">
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
    <div class="${siteKey}-comments">
    </div>
    <div class="d-grid gap-2 mt-4 mb-4">
      <button class="${siteKey}-read-more-btn btn btn-outline-secondary">READ MORE</button>
    </div>
  </div>`
