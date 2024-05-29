import * as NProgress from 'nprogress';
import { createElement, memo, useEffect, useMemo } from 'react';

function TopLoader({ color = 'var(--base-orange)', height = 12, showSpinner, crawl, zIndex = 1600 }) {
    const boxShadow = `box-shadow:0 0 10px ${color},0 0 5px ${color}`;
    const style = useMemo(
        () => `
    #nprogress {
      pointer-events: none;
    }
    #nprogress .bar, 
    .nprogress-custom-parent #nprogress .spinner {
      position: absolute;
    }
    #nprogress .bar {
      background: ${color};
      position: fixed;
      z-index: ${zIndex};
      top: 0;
      left: 0;
      width: 100%;
      height: ${height}px;
    }
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0;
      width: 100px;
      height: 100%;
      ${boxShadow}
      opacity: 1;
      transform: rotate(3deg) translate(0px, -4px);
    }
    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: ${zIndex};
      top: 15px;
      right: 15px;
    }
    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;
      border: 2px solid transparent;
      border-top-color: ${color};
      border-left-color: ${color};
      border-radius: 50%;
      animation: nprogress-spinner 400ms linear infinite;
    }
    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }
    @-webkit-keyframes nprogress-spinner {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
        [color, height, zIndex]
    );
    const styles = createElement('style', null, style);

    function hasSameHostAndPath(url1, url2) {
        const url1Obj = new URL(url1);
        const url2Obj = new URL(url2);
        return url1Obj.hostname === url2Obj.hostname && url1Obj.pathname === url2Obj.pathname && url1Obj.search === url2Obj.search;
    }

    function getHash(url) {
        return new URL(url).hash;
    }

    function removeHash(url) {
        const urlObj = new URL(url);
        return urlObj.href.replace(urlObj.hash, '');
    }

    useEffect(() => {
        NProgress.configure({
            showSpinner: !!showSpinner,
            trickle: !!crawl,
            trickleSpeed: 200,
            minimum: 0.08,
            easing: 'ease',
            speed: 200,
            template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
        });

        function isAnchorOfCurrentUrl(currentUrl, newUrl) {
            const isSameHostAndPath = hasSameHostAndPath(currentUrl, newUrl);
            if (isSameHostAndPath) {
                const currentHash = getHash(currentUrl);
                const newHash = getHash(newUrl);
                return currentHash !== newHash && removeHash(currentUrl) === removeHash(newUrl);
            }
            return false;
        }

        const npgclass = document.querySelectorAll('html');

        function findClosestAnchor(element) {
            do {
                if (element.tagName.toLowerCase() === 'a') {
                    return element;
                }
                element = element.parentElement;
            } while (element);
            return null;
        }

        function handleClick(event) {
            const target = event.target;
            const isIncludeHref = !!target.href;
            if (!isIncludeHref) return;
            const anchor = findClosestAnchor(target);
            const newUrl = anchor ? anchor.href : undefined;
            const currentUrl = window.location.href;
            const isExternalLink = anchor.target === '_blank';
            const isBlob = newUrl.startsWith('blob:');
            const isAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl);
            if (newUrl === currentUrl || isAnchor || isExternalLink || isBlob || event.ctrlKey) {
                NProgress.start();
                NProgress.done();
                [].forEach.call(npgclass, function (el) {
                    el.classList.remove('nprogress-busy');
                });
            } else {
                NProgress.start();
                (function (history) {
                    const pushState = history.pushState;
                    history.pushState = function () {
                        NProgress.done();
                        [].forEach.call(npgclass, function (el) {
                            el.classList.remove('nprogress-busy');
                        });
                        return pushState.apply(history, arguments);
                    };
                })(window.history);
            }
        }

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);
    return styles;
}

export default memo(TopLoader);
