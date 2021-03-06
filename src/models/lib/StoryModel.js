import assert from 'assert'
import ImageModel from './ImageModel'
import { LangFieldSet } from './helpers'

export default class StoryModel {
  constructor ({ id, title, stereotype, background, image, image2x, legend, brief }) {
    this.id = id
    this.title = title
    this.stereotype = stereotype
    this.background = background
    assert(image == null || image instanceof ImageModel)
    this.image = image
    assert(image2x == null || image2x instanceof ImageModel)
    this.image2x = image2x
    this.legend = legend
    this.brief = brief
    Object.freeze(this)
  }

  static fromJS (data) {
    return data == null ? null : new StoryModel({
      ...data,
      image: ImageModel.fromJS(data.image),
      image2x: ImageModel.fromJS(data.image2x),
    })
  }

  static fromServerModel (data, { locale }) {
    let localeModelFields = new LangFieldSet(data, locale)

    return data == null ? null : new StoryModel({
      // eslint-disable-next-line no-underscore-dangle
      id: data._id,
      title: localeModelFields.getLocaleField('title'),
      stereotype: data.stereotype,
      background: data.background,
      brief: localeModelFields.getLocaleField('brief'),
      legend: localeModelFields.getLocaleField('legend'),
      image: ImageModel.fromServerModel(data.image),
      image2x: ImageModel.fromServerModel(data.image2x),
    })
  }
}
