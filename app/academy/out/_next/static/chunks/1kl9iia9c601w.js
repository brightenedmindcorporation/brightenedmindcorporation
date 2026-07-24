(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return o},formatWithValidation:function(){return u},urlObjectKeys:function(){return a}};for(var s in n)Object.defineProperty(r,s,{enumerable:!0,get:n[s]});let l=e.r(90809)._(e.r(98183)),i=/https?|ftp|gopher|file/;function o(e){let{auth:t,hostname:r}=e,n=e.protocol||"",s=e.pathname||"",o=e.hash||"",a=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(u+=":"+e.port)),a&&"object"==typeof a&&(a=String(l.urlQueryToSearchParams(a)));let c=e.search||a&&`?${a}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||i.test(n))&&!1!==u?(u="//"+(u||""),s&&"/"!==s[0]&&(s="/"+s)):u||(u=""),o&&"#"!==o[0]&&(o="#"+o),c&&"?"!==c[0]&&(c="?"+c),s=s.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${n}${u}${s}${c}${o}`}let a=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return o(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return s}});let n=e.r(71645);function s(e,t){let r=(0,n.useRef)(null),s=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=s.current;t&&(s.current=null,t())}else e&&(r.current=l(e,n)),t&&(s.current=l(t,n))},[e,t])}function l(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return l}});let n=e.r(18967),s=e.r(52817);function l(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,s.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return y},useLinkStatus:function(){return j}};for(var s in n)Object.defineProperty(r,s,{enumerable:!0,get:n[s]});let l=e.r(90809),i=e.r(43476),o=l._(e.r(71645)),a=e.r(95057),u=e.r(8372),c=e.r(18581),d=e.r(18967),h=e.r(5550);e.r(33525);let p=e.r(88540),f=e.r(91949),x=e.r(73668),m=e.r(9396);function y(t){var r,n;let s,l,y,[j,g]=(0,o.useOptimistic)(f.IDLE_LINK_STATUS),v=(0,o.useRef)(null),{href:w,as:N,children:S,prefetch:T=null,passHref:_,replace:P,shallow:M,scroll:O,onClick:C,onMouseEnter:E,onTouchStart:I,legacyBehavior:k=!1,onNavigate:L,transitionTypes:R,ref:U,unstable_dynamicOnHover:W,...K}=t;s=S,k&&("string"==typeof s||"number"==typeof s)&&(s=(0,i.jsx)("a",{children:s}));let A=o.default.useContext(u.AppRouterContext),D=!1!==T,F=!1!==T?null===(n=T)||"auto"===n?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,$="string"==typeof(r=N||w)?r:(0,a.formatUrl)(r);if(k){if(s?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});l=o.default.Children.only(s)}let B=k?l&&"object"==typeof l&&l.ref:U,q=o.default.useCallback(e=>(null!==A&&(v.current=(0,f.mountLinkInstance)(e,$,A,F,D,g)),()=>{v.current&&((0,f.unmountLinkForCurrentNavigation)(v.current),v.current=null),(0,f.unmountPrefetchableInstance)(e)}),[D,$,A,F,g]),z={ref:(0,c.useMergedRef)(q,B),onClick(t){k||"function"!=typeof C||C(t),k&&l.props&&"function"==typeof l.props.onClick&&l.props.onClick(t),!A||t.defaultPrevented||function(t,r,n,s,l,i,a){if("u">typeof window){let u,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,x.isLocalURL)(r)){s&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),i){let e=!1;if(i({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:d}=e.r(99781);o.default.startTransition(()=>{d(r,s?"replace":"push",!1===l?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,n.current,a)})}}(t,$,v,P,O,L,R)},onMouseEnter(e){k||"function"!=typeof E||E(e),k&&l.props&&"function"==typeof l.props.onMouseEnter&&l.props.onMouseEnter(e),A&&D&&(0,f.onNavigationIntent)(e.currentTarget,!0===W)},onTouchStart:function(e){k||"function"!=typeof I||I(e),k&&l.props&&"function"==typeof l.props.onTouchStart&&l.props.onTouchStart(e),A&&D&&(0,f.onNavigationIntent)(e.currentTarget,!0===W)}};return(0,d.isAbsoluteUrl)($)?z.href=$:k&&!_&&("a"!==l.type||"href"in l.props)||(z.href=(0,h.addBasePath)($)),y=k?o.default.cloneElement(l,z):(0,i.jsx)("a",{...K,...z,children:s}),(0,i.jsx)(b.Provider,{value:j,children:y})}e.r(84508);let b=(0,o.createContext)(f.IDLE_LINK_STATUS),j=()=>(0,o.useContext)(b);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},83848,e=>{"use strict";var t=e.i(43476),r=e.i(22016);e.s(["default",0,function(){let e=e=>{window.speechSynthesis.cancel();let t=new SpeechSynthesisUtterance(e);t.lang="en-US",t.rate=.9,t.pitch=1,t.volume=1,window.speechSynthesis.speak(t)},n=()=>{window.speechSynthesis.cancel()};return(0,t.jsx)("main",{className:"min-h-screen bg-red-50 p-8",children:(0,t.jsxs)("div",{className:"max-w-5xl mx-auto",children:[(0,t.jsxs)("div",{className:"bg-red-800 text-white rounded-3xl p-8 shadow-xl",children:[(0,t.jsx)("h1",{className:"text-4xl font-bold",children:"Lesson 3: Numbers and Personal Information"}),(0,t.jsx)("p",{className:"mt-2 text-red-100",children:"Learn numbers and how to share personal information in English."})]}),(0,t.jsxs)("div",{className:"bg-white rounded-3xl shadow-lg p-8 mt-8",children:[(0,t.jsx)("h2",{className:"text-2xl font-bold text-red-800",children:"📘 Lesson"}),(0,t.jsxs)("div",{className:"text-black mt-4 space-y-4",children:[(0,t.jsx)("p",{children:(0,t.jsx)("strong",{children:"Numbers from 1 to 10"})}),(0,t.jsxs)("p",{children:["1 - One ",(0,t.jsx)("br",{}),"2 - Two ",(0,t.jsx)("br",{}),"3 - Three ",(0,t.jsx)("br",{}),"4 - Four ",(0,t.jsx)("br",{}),"5 - Five ",(0,t.jsx)("br",{}),"6 - Six ",(0,t.jsx)("br",{}),"7 - Seven ",(0,t.jsx)("br",{}),"8 - Eight ",(0,t.jsx)("br",{}),"9 - Nine ",(0,t.jsx)("br",{}),"10 - Ten"]}),(0,t.jsx)("p",{children:(0,t.jsx)("strong",{children:"Personal Information"})}),(0,t.jsx)("p",{children:"We use personal information to introduce ourselves."}),(0,t.jsx)("p",{children:"Important questions:"}),(0,t.jsxs)("ul",{className:"list-disc ml-6",children:[(0,t.jsx)("li",{children:"What is your name?"}),(0,t.jsx)("li",{children:"How old are you?"}),(0,t.jsx)("li",{children:"Where do you live?"}),(0,t.jsx)("li",{children:"What is your phone number?"}),(0,t.jsx)("li",{children:"What is your email address?"})]}),(0,t.jsx)("p",{children:(0,t.jsx)("strong",{children:"Example Answers"})}),(0,t.jsxs)("p",{children:["My name is David.",(0,t.jsx)("br",{}),"I am 15 years old.",(0,t.jsx)("br",{}),"I live in Kinshasa.",(0,t.jsx)("br",{}),"My phone number is 123456789.",(0,t.jsx)("br",{}),"My email is david@gmail.com"]})]}),(0,t.jsxs)("div",{className:"mt-6 flex gap-4 flex-wrap",children:[(0,t.jsx)("button",{onClick:()=>e(`
Numbers from one to ten.

One.
Two.
Three.
Four.
Five.
Six.
Seven.
Eight.
Nine.
Ten.

Personal Information.

We use personal
information to
introduce ourselves.

Important questions.

What is your name?

How old are you?

Where do you live?

What is your
phone number?

What is your
email address?

Example answers.

My name is David.

I am fifteen
years old.

I live in Kinshasa.

My phone number is
one two three
four five six
seven eight nine.

My email is
david@gmail.com
                `),className:"bg-blue-700 text-white px-6 py-3 rounded-xl",children:"🔊 Listen Lesson"}),(0,t.jsx)("button",{onClick:n,className:"bg-red-600 text-white px-6 py-3 rounded-xl",children:"⏹ Stop"})]})]}),(0,t.jsxs)("div",{className:"bg-white rounded-3xl shadow-lg p-8 mt-8",children:[(0,t.jsx)("h2",{className:"text-2xl font-bold text-red-800",children:"▶ Video"}),(0,t.jsx)("p",{className:"text-black mt-3",children:"Learn numbers and practice introducing yourself."})]}),(0,t.jsxs)("div",{className:"bg-white rounded-3xl shadow-lg p-8 mt-8",children:[(0,t.jsx)("h2",{className:"text-2xl font-bold text-red-800",children:"📄 Reading Text"}),(0,t.jsxs)("div",{className:"text-black mt-4 space-y-3",children:[(0,t.jsx)("p",{children:"Hello! My name is Sarah."}),(0,t.jsx)("p",{children:"I am 14 years old."}),(0,t.jsx)("p",{children:"I live in Kinshasa."}),(0,t.jsx)("p",{children:"My phone number is 987654321."}),(0,t.jsx)("p",{children:"My email address is sarah@gmail.com."})]}),(0,t.jsxs)("div",{className:"mt-6 flex gap-4 flex-wrap",children:[(0,t.jsx)("button",{onClick:()=>e(`
Hello.

My name is Sarah.

I am fourteen years old.

I live in Kinshasa.

My phone number is nine eight seven six five four three two one.

My email address is sarah@gmail.com
                `),className:"bg-blue-700 text-white px-6 py-3 rounded-xl",children:"🔊 Listen Reading"}),(0,t.jsx)("button",{onClick:n,className:"bg-red-600 text-white px-6 py-3 rounded-xl",children:"⏹ Stop"})]})]}),(0,t.jsxs)("div",{className:"bg-white rounded-3xl shadow-lg p-8 mt-8",children:[(0,t.jsx)("h2",{className:"text-2xl font-bold text-red-800",children:"🎤 Exercises"}),(0,t.jsxs)("ul",{className:"list-disc ml-6 text-black mt-4",children:[(0,t.jsx)("li",{children:"Count from 1 to 10 in English."}),(0,t.jsx)("li",{children:"Write your name in English."}),(0,t.jsx)("li",{children:"Say your age in English."}),(0,t.jsx)("li",{children:"Write your phone number in English."})]})]}),(0,t.jsxs)("div",{className:"bg-white rounded-3xl shadow-lg p-8 mt-8",children:[(0,t.jsx)("h2",{className:"text-2xl font-bold text-red-800",children:"🗣 Speaking Topic"}),(0,t.jsx)("p",{className:"text-black mt-4",children:"Introduce yourself using your personal information."})]}),(0,t.jsx)("div",{className:"text-center mt-10",children:(0,t.jsx)(r.default,{href:"/level1/quiz3",children:(0,t.jsx)("button",{className:"bg-green-600 text-white px-8 py-4 rounded-2xl",children:"📝 Take Quiz"})})})]})})}])}]);