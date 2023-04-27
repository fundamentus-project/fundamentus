import{_ as s,c as n,o,R as a}from"./chunks/framework.70e71619.js";const h=JSON.parse('{"title":"Custom Operations","description":"","frontmatter":{},"headers":[],"relativePath":"extensions/operations.md","lastUpdated":1682552691000}'),e={name:"extensions/operations.md"},t=a(`<h1 id="custom-operations" tabindex="-1">Custom Operations <small></small> <a class="header-anchor" href="#custom-operations" aria-label="Permalink to &quot;Custom Operations &lt;small&gt;&lt;/small&gt;&quot;">​</a></h1><blockquote><p>Custom Operations allow you to create new types of steps for flows. <a href="/configuration/flows/operations.html">Learn more about Operations</a>.</p></blockquote><h2 id="extension-entrypoints" tabindex="-1">Extension Entrypoints <a class="header-anchor" href="#extension-entrypoints" aria-label="Permalink to &quot;Extension Entrypoints&quot;">​</a></h2><p>Your operation has two entrypoints. The App entrypoint is the <code>app</code> file and the API entrypoint is the <code>api</code> file inside the <code>src/</code> folder of your extension package.</p><h3 id="app-entrypoint" tabindex="-1">App Entrypoint <a class="header-anchor" href="#app-entrypoint" aria-label="Permalink to &quot;App Entrypoint&quot;">​</a></h3><p>The App entrypoint exports a configuration object with options to configure the appearance of your operation. When loading your operation, this object is imported by the Directus App host.</p><p>Example of an entrypoint:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">custom</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Custom</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">icon</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">box</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">description</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">This is my custom operation!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#82AAFF;">overview</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">({</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">text</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Text</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#F07178;">text</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> text</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">	]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">options</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#F07178;">field</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Text</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">string</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#F07178;">meta</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#F07178;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">full</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#F07178;">interface</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">input</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">	]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><h4 id="available-options" tabindex="-1">Available Options <a class="header-anchor" href="#available-options" aria-label="Permalink to &quot;Available Options&quot;">​</a></h4><ul><li><code>id</code> — The unique key for this operation. It is good practice to scope proprietary operations with an author prefix.</li><li><code>name</code> — The human-readable name for this operation.</li><li><code>icon</code> — An icon name from the <a href="/getting-started/glossary.html#material-icons">material icon set</a>, or the extended list of Directus custom icons.</li><li><code>description</code> — A short description (&lt;80 characters) of this operation shown in the App.</li><li><code>overview</code> — An overview that will be shown on the operation&#39;s tile. Can be either a function that receives the options of the operation and returns an array of objects containing <code>label</code> and <code>text</code> or a dedicated Vue component.</li><li><code>options</code> — The options of your operation. Can be either an options object or a dedicated Vue component.</li></ul><h3 id="api-entrypoint" tabindex="-1">API Entrypoint <a class="header-anchor" href="#api-entrypoint" aria-label="Permalink to &quot;API Entrypoint&quot;">​</a></h3><p>The API entrypoint exports a configuration object with options to configure the behavior of your operation. When loading your operation, this object is imported by the Directus API host.</p><p>Example of an entrypoint:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">custom</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#82AAFF;">handler</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">({</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">text</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">text</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div><h4 id="available-options-1" tabindex="-1">Available Options <a class="header-anchor" href="#available-options-1" aria-label="Permalink to &quot;Available Options&quot;">​</a></h4><ul><li><code>id</code> — The unique key for this operation. It is good practice to scope proprietary operations with an author prefix.</li><li><code>handler</code> — The operations&#39;s handler function.</li></ul><div class="warning custom-block"><p class="custom-block-title">Extension Id</p><p>The extension id needs to be identical for both entrypoints in order for Directus to recognize them as part of the same extension.</p></div><h2 id="handler-function" tabindex="-1">Handler Function <a class="header-anchor" href="#handler-function" aria-label="Permalink to &quot;Handler Function&quot;">​</a></h2><p>The handler function defined inside the API endpoint will be called whenever the flow the operation is connected to is executed. To trigger the operation connected to the <code>resolve</code> anchor, the handler function has to return a value. To trigger the operation connected to the <code>reject</code> anchor, the handler function has to throw with a value. This value will then be added to the <a href="/configuration/flows.html#the-data-chain">data chain</a>.</p><p>The handler function receives the two parameters <code>options</code> and <code>context</code>. <code>options</code> is an object with the operation&#39;s options as properties and their respective already interpolated values. <code>context</code> is an object with the following properties:</p><ul><li><code>services</code> — All API internal services.</li><li><code>exceptions</code> — API exception objects that can be used to throw &quot;proper&quot; errors.</li><li><code>database</code> — Knex instance that is connected to the current database.</li><li><code>getSchema</code> — Async function that reads the full available schema for use in services</li><li><code>env</code> — Parsed environment variables.</li><li><code>logger</code> — <a href="https://github.com/pinojs/pino" target="_blank" rel="noreferrer">Pino</a> instance.</li><li><code>data</code> — Object containing the raw data returned by the previous operations.</li><li><code>accountability</code> — Information about the current user received by the trigger.</li></ul>`,21),l=[t];function p(r,c,i,D,y,d){return o(),n("div",null,l)}const A=s(e,[["render",p]]);export{h as __pageData,A as default};
