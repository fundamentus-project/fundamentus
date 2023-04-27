import{_ as l,c as n,z as s,t as e,a as o,R as t,o as p}from"./chunks/framework.70e71619.js";const h=JSON.parse('{"title":"Build a Website With Nuxt 3 and the Directus JavaScript SDK","description":"This guide shows you how build a website with Nuxt 3 and Directus as a Headless CMS.","frontmatter":{"description":"This guide shows you how build a website with Nuxt 3 and Directus as a Headless CMS.","tags":[],"skill_level":null,"directus_version":"9.21.4","author_override":null,"author":"Kevin Lewis"},"headers":[],"relativePath":"guides/headless-cms/build-static-website/nuxt-3.md","lastUpdated":1682552691000}'),c={name:"guides/headless-cms/build-static-website/nuxt-3.md"},r=s("h1",{id:"build-a-website-with-nuxt-3-and-the-directus-javascript-sdk",tabindex:"-1"},[o("Build a Website With Nuxt 3 and the Directus JavaScript SDK "),s("a",{class:"header-anchor",href:"#build-a-website-with-nuxt-3-and-the-directus-javascript-sdk","aria-label":'Permalink to "Build a Website With Nuxt 3 and the Directus JavaScript SDK"'},"​")],-1),i=t(`<p><a href="https://nuxt.com/" target="_blank" rel="noreferrer">Nuxt</a> is a popular JavaScript framework based on Vue.js. In this tutorial, you will learn how to build a website using Directus as a CMS. You will store, retrieve, and use global metadata such as the site title, create new pages dynamically based on Directus items, and build a blog.</p><h2 id="before-you-start" tabindex="-1">Before You Start <a class="header-anchor" href="#before-you-start" aria-label="Permalink to &quot;Before You Start&quot;">​</a></h2><p>You will need:</p><ul><li>To install Node.js and a code editor on your computer.</li><li>To sign up for a Directus Cloud account.</li><li>Some knowledge of Vue.js and Nuxt.</li></ul><p>Create a new Directus Cloud project - any tier and configuration is suitable for this tutorial.</p><p>Open your terminal and run the following commands to create a new Nuxt project and the Directus JavaScript SDK:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npx nuxt init my-website</span></span>
<span class="line"><span style="color:#A6ACCD;">cd my-website</span></span>
<span class="line"><span style="color:#A6ACCD;">npm install</span></span>
<span class="line"><span style="color:#A6ACCD;">npm install @directus/sdk</span></span></code></pre></div><p>Open <code>my-website</code> in your code editor and type <code>npm run dev</code> in your terminal to start the Nuxt development server and open <code>http://localhost:3000</code> in your browser.</p><h2 id="create-plugin-for-directus-sdk" tabindex="-1">Create Plugin For @directus/sdk <a class="header-anchor" href="#create-plugin-for-directus-sdk" aria-label="Permalink to &quot;Create Plugin For @directus/sdk&quot;">​</a></h2><p>To expose an npm package available globally in your Nuxt project you must create a plugin. Create a new directory called <code>plugins</code> and a new file called <code>directus.js</code> inside of it.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Directus</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@directus/sdk</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> directus </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Directus</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://your-project-id.directus.app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineNuxtPlugin</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		provide</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">directus</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>Ensure your Project URL is correct when initializing the Directus JavaScript SDK.</p><p>Inside of your <code>app.vue</code> entry file, add the following to the bottom to test that your plugin works:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">const </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">$directus</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> = useNuxtApp() console.log($directus)</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Refresh your browser, and check the console. You should see the Directus instance logged, which means you have access to all of the Directus JavaScript SDK methods by using the <code>useNuxtApp()</code> composable in any page or component.</p><p>Once you&#39;ve confirmed this, remove the <code>&lt;script&gt;</code> from <code>app.vue</code> before continuing.</p><h2 id="using-global-metadata-and-settings" tabindex="-1">Using Global Metadata and Settings <a class="header-anchor" href="#using-global-metadata-and-settings" aria-label="Permalink to &quot;Using Global Metadata and Settings&quot;">​</a></h2><p>In your Directus project, navigate to Settings -&gt; Data Model and create a new collection called <code>global</code>. Under the Singleton option, select &#39;Treat as a single object&#39;, as this collection will have just a single entry containing global website metadata.</p><p>Create two text input fields - one with the key of <code>title</code> and one <code>description</code>.</p><p>Navigate to the content module and enter the global collection. Collections will generally display a list of items, but as a singleton, it will launch directly into the one-item form. Enter information in the title and description field and hit save.</p><p><img src="https://cdn.directus.io/docs/v9/headless-cms/how-to-packet-20220222A/nuxt-global-config.webp" alt="A form named &quot;Global&quot; has two inputs - a title and a description, each filled with some text."></p><p>By default, new collections are not accessible to the public. Navigate to Settings -&gt; Roles &amp; Permissions -&gt; Public and give Read access to the Global collection.</p><p>In <code>app.vue</code>, remove <code>&lt;NuxtWelcome /&gt;</code> and replace it with <code>&lt;NuxtPage /&gt;</code>. This tells Nuxt to use file-based routing.</p><p>Create a new directory called <code>pages</code> and a new file called <code>index.vue</code> inside of it.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;{{</span><span style="color:#A6ACCD;">global.data.title</span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;{{</span><span style="color:#A6ACCD;">global.data.description</span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  const </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> $directus </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> = useNuxtApp()</span></span>
<span class="line"><span style="color:#A6ACCD;">  const </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> data: global </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> = await useAsyncData(&#39;global&#39;, () =&gt; </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    return $directus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">items</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">global</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readByQuery</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Refresh your browser. You should see data from your Directus Global collection in your page.</p><h2 id="creating-pages-with-directus" tabindex="-1">Creating Pages With Directus <a class="header-anchor" href="#creating-pages-with-directus" aria-label="Permalink to &quot;Creating Pages With Directus&quot;">​</a></h2><p>Create a new collection called <code>pages</code> - make the Primary ID Field a &quot;Manually Entered String&quot; called <code>slug</code>, which will correlate with the URL for the page. For example <code>about</code> will later correlate to the page <code>localhost:3000/about</code>.</p><p>Create a text input field called <code>title</code> and a WYSIWYG input field called <code>content</code>. In Roles &amp; Permissions, give the Public role read access to the new collection. Create 3 items in the new collection - <a href="https://github.com/directus/examples/blob/main/website-nuxt3/demo-data" target="_blank" rel="noreferrer">here&#39;s some sample data</a>.</p><p>Inside of <code>pages</code>, create a new file called <code>[slug].vue</code>. This is a dynamic route, so a single file can be used for all of the top-level pages.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;{{</span><span style="color:#A6ACCD;">page.title</span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-html</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">page.content</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  const </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> $directus </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> = useNuxtApp()</span></span>
<span class="line"><span style="color:#A6ACCD;">  const route = useRoute()</span></span>
<span class="line"><span style="color:#A6ACCD;">  const </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> data: page </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> = await useAsyncData(&#39;page&#39;, () =&gt; </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    return $directus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">items</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">pages</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readOne</span><span style="color:#A6ACCD;">(route</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">params</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">slug)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (!page.value) throw createError(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    statusCode: </span><span style="color:#F78C6C;">404</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    statusMessage: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Page Not Found</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Go to <code>http://localhost:3000/about</code>, replacing <code>about</code> with any of your item slugs. Using the Directus JavaScript SDK, the single item with that slug is retrieved, and the page should show your data. <code>readOne()</code> only checks against your <code>slug</code> Primary ID Field.</p><p><em>Note that we check if a returned value exists, and return a 404 if not. Please also note that <a href="https://vuejs.org/api/built-in-directives.html#v-html" target="_blank" rel="noreferrer"><code>v-html</code> should only be used for trusted content.</a></em></p><h2 id="creating-blog-posts-with-directus" tabindex="-1">Creating Blog Posts With Directus <a class="header-anchor" href="#creating-blog-posts-with-directus" aria-label="Permalink to &quot;Creating Blog Posts With Directus&quot;">​</a></h2><p>Create a new collection called <code>authors</code> with a single text input field called <code>name</code>. Create one or more authors.</p><p>Then, create a new collection called <code>posts</code> - make the Primary ID Field a &quot;Manually Entered String&quot; called <code>slug</code>, which will correlate with the URL for the page. For example <code>hello-world</code> will later correlate to the page <code>localhost:3000/blog/hello-world</code>.</p><p>Create the following fields in your <code>posts</code> data model:</p><ul><li>a text input field called <code>title</code></li><li>a WYSIWYG input field called <code>content</code></li><li>an image relational field called <code>image</code></li><li>a datetime selection field called <code>published</code> - set the type to &#39;date&#39;</li><li>a many-to-one relational field called <code>author</code> with the related collection set to <code>authors</code></li></ul><p>In Roles &amp; Permissions, give the Public role read access to the <code>authors</code>, <code>posts</code>, and <code>directus_files</code> collections.</p><p>Create 3 items in the posts collection - <a href="https://github.com/directus/examples/blob/main/website-nuxt3/demo-data" target="_blank" rel="noreferrer">here&#39;s some sample data</a>.</p><h3 id="create-blog-post-listing" tabindex="-1">Create Blog Post Listing <a class="header-anchor" href="#create-blog-post-listing" aria-label="Permalink to &quot;Create Blog Post Listing&quot;">​</a></h3><p>Inside of the <code>pages</code> directory, create a new subdirectory called <code>blog</code> and a new file called <code>index.vue</code> inside of it.</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Blog</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  const </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> $directus </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> = useNuxtApp()</span></span>
<span class="line"><span style="color:#A6ACCD;">  const </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> data: posts </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> = await useAsyncData(&#39;posts&#39;, () =&gt; </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    return $directus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">items</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">posts</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readByQuery</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">fields</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">slug</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">publish_date</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">author.name</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">sort</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">-publish_date</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>This query will retrieve the first 100 items (default), sorted by publish date (descending order, which is latest first). It will only return the specific fields we request - <code>slug</code>, <code>title</code>, <code>publish_date</code>, and the <code>name</code> from the related <code>author</code> item.</p><p>Update the <code>&lt;template&gt;</code> section:</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Blog</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">ul</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">li</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-for</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">post in posts.data</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:href</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\`/blog/\${post.slug}\`</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h2</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">{{post.title}}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h2</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">{{post.publish_date}} &amp;bull; {{post.author.name}}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">span</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">li</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">ul</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Visit <code>http://localhost:3000</code> and you should now see a blog post listing, with latest items first.</p><p><img src="https://cdn.directus.io/docs/v9/headless-cms/how-to-packet-20220222A/nuxt-blog-listing.webp" alt="A page with a title of &quot;Blog&quot;. On it is a list of three items - each with a title, author, and date. The title is a link."></p><h3 id="create-blog-post-listing-1" tabindex="-1">Create Blog Post Listing <a class="header-anchor" href="#create-blog-post-listing-1" aria-label="Permalink to &quot;Create Blog Post Listing&quot;">​</a></h3><p>Each blog post links to a page that does not yet exist. In the <code>pages/blog</code> directory, create a new file called <code>[slug].vue</code>:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">img</span><span style="color:#89DDFF;"> :src=&quot;\`\${$directus.url}/assets/\${post.image.filename_disk}?width=600\`&quot; </span><span style="color:#C792EA;">alt</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;{{</span><span style="color:#A6ACCD;">post.title</span><span style="color:#89DDFF;">}}&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-html</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">post.content</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">setup</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  const </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> $directus </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> = useNuxtApp()</span></span>
<span class="line"><span style="color:#A6ACCD;">  const route = useRoute()</span></span>
<span class="line"><span style="color:#A6ACCD;">  const </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> data: post </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> = await useAsyncData(&#39;post&#39;, () =&gt; </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    return $directus</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">items</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">posts</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">readOne</span><span style="color:#A6ACCD;">(route</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">params</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">slug</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">fields</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">*.*</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (!post.value) throw createError(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    statusCode: </span><span style="color:#F78C6C;">404</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    statusMessage: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Post Not Found</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Some key notes about this code snippet.</p><ul><li>In the <code>&lt;img&gt;</code> tag, <code>$directus.url</code> is the value provided when creating the Directus plugin.</li><li>The <code>width</code> attribute demonstrates Directus&#39; built-in image transformations.</li><li>Once again, <code>v-html</code> should only be used if all content is trusted.</li><li>Because almost-all fields are used in this page, including those from the <code>image</code> relational field, the <code>fields</code> property when using the Directus JavaScript SDK can be set to <code>*.*</code>.</li></ul><p>Click on any of the blog post links, and it will take you to a blog post page complete with a header image.</p><p><img src="https://cdn.directus.io/docs/v9/headless-cms/how-to-packet-20220222A/nuxt-blog-single.webp" alt="A blog post page shows an image, a title, and a number of paragraphs."></p><h2 id="add-navigation" tabindex="-1">Add Navigation <a class="header-anchor" href="#add-navigation" aria-label="Permalink to &quot;Add Navigation&quot;">​</a></h2><p>While not strictly Directus-related, there are now several pages that aren&#39;t linked to each other. In <code>app.vue</code>, above the <code>&lt;NuxtPage /&gt;</code> component, add a navigation. Don&#39;t forget to use your specific page slugs.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">nav</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Home</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/about</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">About</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/conduct</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Code of Conduct</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/privacy</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Privacy Policy</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">to</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/blog</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Blog</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">NuxtLink</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">nav</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><p>Through this guide, you have set up a Nuxt project, created a Directus plugin, and used it to query data. You have used a singleton collection for global metadata, dynamically created pages, as well as blog listing and post pages.</p><p>If you want to change what is user-accessible, consider setting up more restrictive roles and accessing only valid data at build-time.</p><p>If you want to build more complex dynamic pages made out of reusable components, check out <a href="/use-cases/headless-cms/create-reusable-page-components-using-m2a.html">our recipe on doing just this</a>.</p><p>If you want to see the code for this project, you can find it <a href="https://github.com/directus/examples/blob/main/website-nuxt3" target="_blank" rel="noreferrer">on GitHub</a>.</p>`,63);function D(a,y,F,d,u,C){return p(),n("div",null,[r,s("blockquote",null,[s("p",null,e(a.$frontmatter.description),1)]),i])}const g=l(c,[["render",D]]);export{h as __pageData,g as default};
