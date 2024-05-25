const last = (arr) => arr[arr.length - 1];

const trackLinkOut = (item) => (target) =>
  item.addEventListener('click', () => {
    fathom?.trackEvent(`${target} from ${document.title.split(' | ')[0].replace('IFRAME-RESIZER', 'Homepage')}`);
  });

if (document.title === '404') {
  fathom?.trackEvent(`404: ${document.referrer || 'Direct'}`)
}

document.querySelectorAll('a').forEach((item) => {
  const trackLink = trackLinkOut(item)

  if (false === item.href.includes('iframe-resizer.com') && false === item.href.includes('localhost')) {
    item.target = '_blank'
  }

  switch (true) {
    case item.href.includes('github.com'):
      return trackLink('GitHub')

    case item.href.includes('mozilla.org'):
      return trackLink(`Mozilla ${last(item.href.split('/'))}`)

    case item.href.includes('viewerjs.org'):
      return trackLink('PDF/ODF Viewer')

    case item.href.includes('mail'):
      return trackLink('Contact')

    case item.href.includes('http'):
      return trackLink(`External Link: ${item.href}`)
    
    default:
      return
  }
})
