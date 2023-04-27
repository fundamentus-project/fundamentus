import{_ as s,c as n,o as a,R as l}from"./chunks/framework.70e71619.js";const i=JSON.parse('{"title":"Schema","description":"REST and GraphQL API documentation on the Schema endpoint in Directus.","frontmatter":{"description":"REST and GraphQL API documentation on the Schema endpoint in Directus.","readTime":"5 min read","pageClass":"page-reference"},"headers":[],"relativePath":"reference/system/schema.md","lastUpdated":1682552691000}'),o={name:"reference/system/schema.md"},p=l(`<h1 id="schema" tabindex="-1">Schema <a class="header-anchor" href="#schema" aria-label="Permalink to &quot;Schema&quot;">​</a></h1><blockquote><p>Retrieve and update the schema of an instance.</p></blockquote><h2 id="retrieve-schema-snapshot" tabindex="-1">Retrieve Schema Snapshot <a class="header-anchor" href="#retrieve-schema-snapshot" aria-label="Permalink to &quot;Retrieve Schema Snapshot&quot;">​</a></h2><p>Retrieve the current schema. This endpoint is only available to admin users.</p><h3 id="query-parameters" tabindex="-1">Query Parameters <a class="header-anchor" href="#query-parameters" aria-label="Permalink to &quot;Query Parameters&quot;">​</a></h3><p>Supports the <a href="/reference/query.html#export">export</a> query parameter.</p><h3 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h3><p>Returns the JSON object containing schema details by default, or downloads it in an alternative format when <code>export</code> query parameter is used.</p><h3 id="rest-api" tabindex="-1">REST API <a class="header-anchor" href="#rest-api" aria-label="Permalink to &quot;REST API&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">GET /schema/snapshot</span></span></code></pre></div><h5 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h5><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// returns JSON object</span></span>
<span class="line"><span style="color:#A6ACCD;">GET /schema/snapshot</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// download as YAML file</span></span>
<span class="line"><span style="color:#A6ACCD;">GET /schema/snapshot?export=yaml</span></span></code></pre></div><h3 id="graphql" tabindex="-1">GraphQL <a class="header-anchor" href="#graphql" aria-label="Permalink to &quot;GraphQL&quot;">​</a></h3><p>n/a</p><h2 id="retrieve-schema-difference" tabindex="-1">Retrieve Schema Difference <a class="header-anchor" href="#retrieve-schema-difference" aria-label="Permalink to &quot;Retrieve Schema Difference&quot;">​</a></h2><p>Compare the current instance&#39;s schema against the schema snapshot in JSON request body and retrieve the difference. This endpoint is only available to admin users.</p><p>Alternatively, upload a JSON or YAML schema file. Relies on a <code>multipart/form-data</code> encoded request like regular file uploads. Check <a href="/reference/files.html#upload-a-file">Upload a File</a> for more information.</p><div class="warning custom-block"><p class="custom-block-title">Different versions and vendors</p><p>This endpoint does not allow different Directus versions and database vendors by default. This is to avoid any unintentional diffs from being generated. You can opt in to bypass these checks by passing the <code>force</code> query parameter.</p></div><h3 id="query-parameters-1" tabindex="-1">Query Parameters <a class="header-anchor" href="#query-parameters-1" aria-label="Permalink to &quot;Query Parameters&quot;">​</a></h3><p><code>force</code> <strong>boolean</strong><br> Bypass version and database vendor restrictions.</p><h3 id="request-body" tabindex="-1">Request Body <a class="header-anchor" href="#request-body" aria-label="Permalink to &quot;Request Body&quot;">​</a></h3><p>JSON object containing <a href="/reference/system/collections.html#the-collection-object">collections</a>, <a href="/reference/system/fields.html#the-field-object">fields</a>, and <a href="/reference/system/relations.html#the-relation-object">relations</a> to apply.</p><p>Alternatively, send a JSON or YAML schema file in a <code>multipart/form-data</code> request. See <a href="/reference/files.html#upload-a-file">Upload a File</a> for more information.</p><h3 id="returns-1" tabindex="-1">Returns <a class="header-anchor" href="#returns-1" aria-label="Permalink to &quot;Returns&quot;">​</a></h3><p>Returns the differences between the current instance&#39;s schema and the schema passed in the request body.</p><details class="details custom-block"><summary><strong>Toggle Open to See Sample Response</strong></summary><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">hash</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">2b3c71570228b864e16098147e5497f61b245a42</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">diff</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">collections</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">collection</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">diff</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">N</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">rhs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">collection</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">meta</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">accountability</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">all</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">archive_app_filter</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">archive_field</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">archive_value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">collapse</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">open</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">collection</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">color</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">display_template</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">group</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">hidden</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">icon</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">item_duplication_fields</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">note</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">singleton</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">sort</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">sort_field</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">translations</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">unarchive_value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">schema</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">fields</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">collection</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">field</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">diff</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">N</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">rhs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">collection</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">field</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">integer</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">meta</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">collection</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">conditions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">display</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">display_options</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">field</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">group</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">hidden</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">interface</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">input</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">note</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">options</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">readonly</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">required</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">sort</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">special</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">translations</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">validation</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">validation_message</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">width</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">full</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">schema</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">data_type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">integer</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">default_value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">max_length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">numeric_precision</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">numeric_scale</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">is_nullable</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">is_unique</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">is_primary_key</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">is_generated</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">generation_expression</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">has_auto_increment</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">foreign_key_table</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">foreign_key_column</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">collection</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">field</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">diff</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">kind</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">N</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">rhs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">collection</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">field</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">string</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">meta</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">collection</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">conditions</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">display</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">display_options</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">field</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">group</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">hidden</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">interface</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">input</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">note</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">options</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">readonly</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">required</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">sort</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">special</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">translations</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">validation</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">validation_message</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">width</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">full</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">&quot;</span><span style="color:#916B53;">schema</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">table</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">articles</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">data_type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">varchar</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">default_value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">max_length</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">255</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">numeric_precision</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">numeric_scale</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">is_nullable</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">is_unique</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">is_primary_key</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">is_generated</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">generation_expression</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">has_auto_increment</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">foreign_key_table</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null,</span></span>
<span class="line"><span style="color:#A6ACCD;">								</span><span style="color:#89DDFF;">&quot;</span><span style="color:#82AAFF;">foreign_key_column</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null</span></span>
<span class="line"><span style="color:#A6ACCD;">							</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">relations</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[]</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></details><h3 id="rest-api-1" tabindex="-1">REST API <a class="header-anchor" href="#rest-api-1" aria-label="Permalink to &quot;REST API&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#A6ACCD;">POST /schema/diff</span></span></code></pre></div><details class="details custom-block"><summary><strong>Toggle Open to See Sample Body</strong></summary><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#A6ACCD;">POST /schema/diff</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Type: multipart/form-data; charset=utf-8; boundary=__X_BOUNDARY__</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Length: 3442422</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">--__X_BOUNDARY__</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Disposition: form-data; name=&quot;file&quot;; filename=&quot;schema.yaml&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">Content-Type: text/yaml</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">version: 1</span></span>
<span class="line"><span style="color:#A6ACCD;">directus: 9.22.4</span></span>
<span class="line"><span style="color:#A6ACCD;">vendor: sqlite</span></span>
<span class="line"><span style="color:#A6ACCD;">collections:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - collection: articles</span></span>
<span class="line"><span style="color:#A6ACCD;">    meta:</span></span>
<span class="line"><span style="color:#A6ACCD;">      accountability: all</span></span>
<span class="line"><span style="color:#A6ACCD;">      archive_app_filter: true</span></span>
<span class="line"><span style="color:#A6ACCD;">      archive_field: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      archive_value: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      collapse: open</span></span>
<span class="line"><span style="color:#A6ACCD;">      collection: articles</span></span>
<span class="line"><span style="color:#A6ACCD;">      color: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      display_template: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      group: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      hidden: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      icon: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      item_duplication_fields: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      note: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      singleton: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      sort: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      sort_field: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      translations: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      unarchive_value: null</span></span>
<span class="line"><span style="color:#A6ACCD;">    schema:</span></span>
<span class="line"><span style="color:#A6ACCD;">      name: articles</span></span>
<span class="line"><span style="color:#A6ACCD;">fields:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - collection: articles</span></span>
<span class="line"><span style="color:#A6ACCD;">    field: id</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: integer</span></span>
<span class="line"><span style="color:#A6ACCD;">    meta:</span></span>
<span class="line"><span style="color:#A6ACCD;">      collection: articles</span></span>
<span class="line"><span style="color:#A6ACCD;">      conditions: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      display: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      display_options: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      field: id</span></span>
<span class="line"><span style="color:#A6ACCD;">      group: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      hidden: true</span></span>
<span class="line"><span style="color:#A6ACCD;">      interface: input</span></span>
<span class="line"><span style="color:#A6ACCD;">      note: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      options: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      readonly: true</span></span>
<span class="line"><span style="color:#A6ACCD;">      required: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      sort: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      special: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      translations: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      validation: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      validation_message: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      width: full</span></span>
<span class="line"><span style="color:#A6ACCD;">    schema:</span></span>
<span class="line"><span style="color:#A6ACCD;">      name: id</span></span>
<span class="line"><span style="color:#A6ACCD;">      table: articles</span></span>
<span class="line"><span style="color:#A6ACCD;">      data_type: integer</span></span>
<span class="line"><span style="color:#A6ACCD;">      default_value: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      max_length: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      numeric_precision: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      numeric_scale: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      is_nullable: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      is_unique: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      is_primary_key: true</span></span>
<span class="line"><span style="color:#A6ACCD;">      is_generated: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      generation_expression: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      has_auto_increment: true</span></span>
<span class="line"><span style="color:#A6ACCD;">      foreign_key_table: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      foreign_key_column: null</span></span>
<span class="line"><span style="color:#A6ACCD;">  - collection: articles</span></span>
<span class="line"><span style="color:#A6ACCD;">    field: title</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: string</span></span>
<span class="line"><span style="color:#A6ACCD;">    meta:</span></span>
<span class="line"><span style="color:#A6ACCD;">      collection: articles</span></span>
<span class="line"><span style="color:#A6ACCD;">      conditions: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      display: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      display_options: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      field: title</span></span>
<span class="line"><span style="color:#A6ACCD;">      group: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      hidden: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      interface: input</span></span>
<span class="line"><span style="color:#A6ACCD;">      note: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      options: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      readonly: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      required: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      sort: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      special: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      translations: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      validation: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      validation_message: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      width: full</span></span>
<span class="line"><span style="color:#A6ACCD;">    schema:</span></span>
<span class="line"><span style="color:#A6ACCD;">      name: title</span></span>
<span class="line"><span style="color:#A6ACCD;">      table: articles</span></span>
<span class="line"><span style="color:#A6ACCD;">      data_type: varchar</span></span>
<span class="line"><span style="color:#A6ACCD;">      default_value: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      max_length: 255</span></span>
<span class="line"><span style="color:#A6ACCD;">      numeric_precision: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      numeric_scale: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      is_nullable: true</span></span>
<span class="line"><span style="color:#A6ACCD;">      is_unique: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      is_primary_key: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      is_generated: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      generation_expression: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      has_auto_increment: false</span></span>
<span class="line"><span style="color:#A6ACCD;">      foreign_key_table: null</span></span>
<span class="line"><span style="color:#A6ACCD;">      foreign_key_column: null</span></span>
<span class="line"><span style="color:#A6ACCD;">relations: []</span></span></code></pre></div></details><h3 id="graphql-1" tabindex="-1">GraphQL <a class="header-anchor" href="#graphql-1" aria-label="Permalink to &quot;GraphQL&quot;">​</a></h3><p>n/a</p><h2 id="apply-schema-difference" tabindex="-1">Apply Schema Difference <a class="header-anchor" href="#apply-schema-difference" aria-label="Permalink to &quot;Apply Schema Difference&quot;">​</a></h2><p>Update the instance&#39;s schema by passing the diff previously retrieved via <code>/schema/diff</code> endpoint in the request body. This endpoint is only available to admin users.</p><h3 id="query-parameters-2" tabindex="-1">Query Parameters <a class="header-anchor" href="#query-parameters-2" aria-label="Permalink to &quot;Query Parameters&quot;">​</a></h3><p>This endpoint doesn&#39;t currently support any query parameters.</p><h3 id="request-body-1" tabindex="-1">Request Body <a class="header-anchor" href="#request-body-1" aria-label="Permalink to &quot;Request Body&quot;">​</a></h3><p>JSON object containing hash and diffs of <a href="/reference/system/collections.html#the-collection-object">collections</a>, <a href="/reference/system/fields.html#the-field-object">fields</a>, and <a href="/reference/system/relations.html#the-relation-object">relations</a> to apply.</p><h3 id="returns-2" tabindex="-1">Returns <a class="header-anchor" href="#returns-2" aria-label="Permalink to &quot;Returns&quot;">​</a></h3><p>Empty body.</p><h3 id="rest-api-2" tabindex="-1">REST API <a class="header-anchor" href="#rest-api-2" aria-label="Permalink to &quot;REST API&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">POST /schema/apply</span></span></code></pre></div><details class="details custom-block"><summary><strong>Toggle Open to See Sample Body</strong></summary><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#A6ACCD;">POST /schema/apply</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;hash&quot;: &quot;2b3c71570228b864e16098147e5497f61b245a42&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;diff&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;collections&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">      {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;collection&quot;: &quot;articles&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;diff&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">          {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;kind&quot;: &quot;N&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;rhs&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;collection&quot;: &quot;articles&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;meta&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;accountability&quot;: &quot;all&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;archive_app_filter&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;archive_field&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;archive_value&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;collapse&quot;: &quot;open&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;collection&quot;: &quot;articles&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;color&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;display_template&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;group&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;hidden&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;icon&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;item_duplication_fields&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;note&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;singleton&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;sort&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;sort_field&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;translations&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;unarchive_value&quot;: null</span></span>
<span class="line"><span style="color:#A6ACCD;">              },</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;schema&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;name&quot;: &quot;articles&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">              }</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;fields&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">      {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;collection&quot;: &quot;articles&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;field&quot;: &quot;id&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;diff&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">          {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;kind&quot;: &quot;N&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;rhs&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;collection&quot;: &quot;articles&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;field&quot;: &quot;id&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;type&quot;: &quot;integer&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;meta&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;collection&quot;: &quot;articles&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;conditions&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;display&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;display_options&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;field&quot;: &quot;id&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;group&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;hidden&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;interface&quot;: &quot;input&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;note&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;options&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;readonly&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;required&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;sort&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;special&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;translations&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;validation&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;validation_message&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;width&quot;: &quot;full&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">              },</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;schema&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;name&quot;: &quot;id&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;table&quot;: &quot;articles&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;data_type&quot;: &quot;integer&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;default_value&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;max_length&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;numeric_precision&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;numeric_scale&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;is_nullable&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;is_unique&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;is_primary_key&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;is_generated&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;generation_expression&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;has_auto_increment&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;foreign_key_table&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;foreign_key_column&quot;: null</span></span>
<span class="line"><span style="color:#A6ACCD;">              }</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">      {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;collection&quot;: &quot;articles&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;field&quot;: &quot;title&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;diff&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">          {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;kind&quot;: &quot;N&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;rhs&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;collection&quot;: &quot;articles&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;field&quot;: &quot;title&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;type&quot;: &quot;string&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;meta&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;collection&quot;: &quot;articles&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;conditions&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;display&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;display_options&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;field&quot;: &quot;title&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;group&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;hidden&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;interface&quot;: &quot;input&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;note&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;options&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;readonly&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;required&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;sort&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;special&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;translations&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;validation&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;validation_message&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;width&quot;: &quot;full&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">              },</span></span>
<span class="line"><span style="color:#A6ACCD;">              &quot;schema&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;name&quot;: &quot;title&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;table&quot;: &quot;articles&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;data_type&quot;: &quot;varchar&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;default_value&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;max_length&quot;: 255,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;numeric_precision&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;numeric_scale&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;is_nullable&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;is_unique&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;is_primary_key&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;is_generated&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;generation_expression&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;has_auto_increment&quot;: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;foreign_key_table&quot;: null,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;foreign_key_column&quot;: null</span></span>
<span class="line"><span style="color:#A6ACCD;">              }</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">          }</span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;relations&quot;: []</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div></details><div class="tip custom-block"><p class="custom-block-title">Hashes</p><p>The hash property in the diff is based on the target instance&#39;s schema and version. It is used to safeguard against changes that may happen after the current diff was generated which can potentially incur unexpected side effects when applying the diffs without this safeguard. In case the schema has been changed in the meantime, the diff must be regenerated.</p></div><h3 id="graphql-2" tabindex="-1">GraphQL <a class="header-anchor" href="#graphql-2" aria-label="Permalink to &quot;GraphQL&quot;">​</a></h3><p>n/a</p>`,45),t=[p];function e(c,r,D,y,F,A){return a(),n("div",null,t)}const u=s(o,[["render",e]]);export{i as __pageData,u as default};
