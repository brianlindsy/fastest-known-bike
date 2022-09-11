export const nthChildToNthChildType = css => css.replace(/\:nth\-child/g, `:nth-type`)
export const firstChildToFirstOfType = css => css.replace(/\:first\-child/g, `:first-of-type`)

export const fixCss = css => firstChildToFirstOfType(nthChildToNthChildType(css))