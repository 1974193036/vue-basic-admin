// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  title = title.charAt(0).toLowerCase() + title.slice(1)

  const hasKey = this.$te('route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('route.' + title)

    return translatedTitle
  }
  return title
}
