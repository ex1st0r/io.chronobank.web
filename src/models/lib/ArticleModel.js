import assert from 'assert'
import ImageModel from './ImageModel'

export default class ArticleModel {
  constructor ({ id, title, source, url, icon, icon2x, brief }) {
    this.id = id
    this.title = title
    this.source = source
    this.url = url
    assert(icon == null || icon instanceof ImageModel)
    this.icon = icon
    assert(icon2x == null || icon2x instanceof ImageModel)
    this.icon2x = icon2x
    this.brief = brief
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new ArticleModel({
      ...data,
      icon: ImageModel.fromJS(data.icon),
      icon2x: ImageModel.fromJS(data.icon2x),
    })
  }

  static fromServerModel (data) {
    return data == null ? null : new ArticleModel({
      id: data._id,
      title: data.title,
      source: data.source,
      url: data.url,
      brief: data.brief,
      icon: ImageModel.fromServerModel(data.icon),
      icon2x: ImageModel.fromServerModel(data.icon2x)
    })
  }
}