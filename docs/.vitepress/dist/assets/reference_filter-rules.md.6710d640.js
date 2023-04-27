import{_ as s,c as a,o as n,R as t}from"./chunks/framework.70e71619.js";const u=JSON.parse('{"title":"Filter Rules","description":"REST and GraphQL API documentation for filter rules in Directus.","frontmatter":{"description":"REST and GraphQL API documentation for filter rules in Directus.","readTime":"5 min read"},"headers":[],"relativePath":"reference/filter-rules.md","lastUpdated":1682552691000}'),o={name:"reference/filter-rules.md"},l=t(`<h1 id="filter-rules" tabindex="-1">Filter Rules <a class="header-anchor" href="#filter-rules" aria-label="Permalink to &quot;Filter Rules&quot;">​</a></h1><blockquote><p>Permissions, validation, and the API&#39;s <code>filter</code> parameter all rely on a specific JSON structure to define their rules. This page describes the syntax for creating flat, relational, or complex filter rules.</p></blockquote><h2 id="syntax" tabindex="-1">Syntax <a class="header-anchor" href="#syntax" aria-label="Permalink to &quot;Syntax&quot;">​</a></h2><ul><li><strong>Field</strong> — Any valid root field, <a href="#relational">relational field</a>, or <a href="#logical-operators">logical operator</a></li><li><strong>Operator</strong> — Any valid <a href="#filter-operators">filter operator</a></li><li><strong>Value</strong> — Any valid static value, or <a href="#dynamic-variables">dynamic variable</a></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;field&gt;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;operator&gt;: &lt;value&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">_contains</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Directus</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">owner</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">_eq</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$CURRENT_USER</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">datetime</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">_lte</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$NOW</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="filter-operators" tabindex="-1">Filter Operators <a class="header-anchor" href="#filter-operators" aria-label="Permalink to &quot;Filter Operators&quot;">​</a></h2><table><thead><tr><th>Operator Title <em>(in app)</em></th><th>Operator</th><th>Description</th></tr></thead><tbody><tr><td>Equals</td><td><code>_eq</code></td><td>Equal to</td></tr><tr><td>Doesn&#39;t equal</td><td><code>_neq</code></td><td>Not equal to</td></tr><tr><td>Less than</td><td><code>_lt</code></td><td>Less than</td></tr><tr><td>Less than or equal to</td><td><code>_lte</code></td><td>Less than or equal to</td></tr><tr><td>Greater than</td><td><code>_gt</code></td><td>Greater than</td></tr><tr><td>Greater than or equal to</td><td><code>_gte</code></td><td>Greater than or equal to</td></tr><tr><td>Is one of</td><td><code>_in</code></td><td>Matches any of the values</td></tr><tr><td>Is not one of</td><td><code>_nin</code></td><td>Doesn&#39;t match any of the values</td></tr><tr><td>Is null</td><td><code>_null</code></td><td>Is <code>null</code></td></tr><tr><td>Isn&#39;t null</td><td><code>_nnull</code></td><td>Is not <code>null</code></td></tr><tr><td>Contains</td><td><code>_contains</code></td><td>Contains the substring</td></tr><tr><td>Doesn&#39;t contain</td><td><code>_ncontains</code></td><td>Doesn&#39;t contain the substring</td></tr><tr><td>Starts with</td><td><code>_starts_with</code></td><td>Starts with</td></tr><tr><td>Doesn&#39;t start with</td><td><code>_nstarts_with</code></td><td>Doesn&#39;t start with</td></tr><tr><td>Ends with</td><td><code>_ends_with</code></td><td>Ends with</td></tr><tr><td>Doesn&#39;t end with</td><td><code>_nends_with</code></td><td>Doesn&#39;t end with</td></tr><tr><td>Is between</td><td><code>_between</code></td><td>Is between two values (inclusive)</td></tr><tr><td>Isn&#39;t between</td><td><code>_nbetween</code></td><td>Is not between two values (inclusive)</td></tr><tr><td>Is empty</td><td><code>_empty</code></td><td>Is empty (<code>null</code> or falsy)</td></tr><tr><td>Isn&#39;t empty</td><td><code>_nempty</code></td><td>Is not empty (<code>null</code> or falsy)</td></tr><tr><td>Intersects</td><td><code>_intersects</code> <sup>[1]</sup></td><td>Value intersects a given point</td></tr><tr><td>Doesn&#39;t intersect</td><td><code>_nintersects</code> <sup>[1]</sup></td><td>Value does not intersect a given point</td></tr><tr><td>Intersects Bounding box</td><td><code>_intersects_bbox</code> <sup>[1]</sup></td><td>Value is in a bounding box</td></tr><tr><td>Doesn&#39;t intersect bounding box</td><td><code>_nintersects_bbox</code> <sup>[1]</sup></td><td>Value is not in a bounding box</td></tr></tbody></table><p>The following operator has no Title on the Filter Interface as it is <strong>only available in validation permissions</strong>:</p><table><thead><tr><th>Operator</th><th>Description</th></tr></thead><tbody><tr><td><code>_regex</code> <sup>[2]</sup></td><td>Field has to match regex</td></tr></tbody></table><p><sup>[1]</sup> Only available on Geometry types.<br><sup>[2]</sup> JavaScript &quot;flavor&quot; regex. Make sure to escape backslashes.</p><h2 id="relational" tabindex="-1">Relational <a class="header-anchor" href="#relational" aria-label="Permalink to &quot;Relational&quot;">​</a></h2><p>You can target related values by nesting field names. For example, if you have a relational Many-to-One <code>author</code> field, you can set a rule for the <code>author.name</code> field using the following syntax.</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">author</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">_eq</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Rijk van Zanten</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>When using M2M relationships, a junction table will be created and the filter applies to the junction table itself. For example, if you have a <code>books</code> collection, with a M2M relationship to authors of each book, the junction collection will probably be named <code>books_authors</code> and have 3 fields : <code>id</code>, <code>books_id</code> and <code>authors_id</code>. To filter specific books depending on their authors you must go through the junction table and the <code>authors_id</code> field :</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">authors</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">authors_id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">_eq</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Rijk van Zanten</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="logical-operators" tabindex="-1">Logical Operators <a class="header-anchor" href="#logical-operators" aria-label="Permalink to &quot;Logical Operators&quot;">​</a></h2><p>You can nest or group multiple rules using the <code>_and</code> or <code>_or</code> logical operators. Each logical operator holds an array of Filter Rules, allowing for more complex filtering. Also note in the example that Logical Operators can be sub-nested into Logical Operators. However, they cannot be sub-nested into Filter Rules.</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">_or</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">_and</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">user_created</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">_eq</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$CURRENT_USER</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">status</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">_in</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">published</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">draft</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">_and</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">user_created</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">_neq</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$CURRENT_USER</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">status</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">						</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">_in</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">published</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">					</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h3 id="some-vs-none-in-one-to-many" tabindex="-1">Some vs None in One-to-Many <a class="header-anchor" href="#some-vs-none-in-one-to-many" aria-label="Permalink to &quot;Some vs None in One-to-Many&quot;">​</a></h3><p>When applying filters to a one-to-many field, Directus will default to a &quot;some&quot; search, for example in:</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">categories</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">_eq</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Recipe</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>the top level parent will be returned if <em>one of</em> the categories has the name <code>Recipe</code>. This behavior can be overridden by using the explicit <code>_some</code> and <code>_none</code> operators, for example:</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">categories</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">_none</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F78C6C;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">				</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">_eq</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Recipe</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>will fetch all parent items that don&#39;t have the category &quot;Recipe&quot;</p><h2 id="dynamic-variables" tabindex="-1">Dynamic Variables <a class="header-anchor" href="#dynamic-variables" aria-label="Permalink to &quot;Dynamic Variables&quot;">​</a></h2><p>In addition to static values, you can also filter against <em>dynamic</em> values using the following variables.</p><ul><li><code>$CURRENT_USER</code> — The primary key of the currently authenticated user</li><li><code>$CURRENT_ROLE</code> — The primary key of the role for the currently authenticated user</li><li><code>$NOW</code> — The current timestamp</li><li><code>$NOW(&lt;adjustment&gt;)</code> - The current timestamp plus/minus a given distance, for example <code>$NOW(-1 year)</code>, <code>$NOW(+2 hours)</code></li></ul><div class="tip custom-block"><p class="custom-block-title">Functions</p><p>You can also use <a href="/reference/query.html#functions">Function Parameters</a> when building Filters.</p></div><div class="tip custom-block"><p class="custom-block-title">Nested User / Role variables in Permissions</p><p>When configuring permissions, <code>$CURRENT_USER</code> and <code>$CURRENT_ROLE</code> allow you to specify any (nested) field under the current user/role as well as the root ID. For example: <code>$CURRENT_ROLE.name</code> or <code>$CURRENT_USER.avatar.filesize</code>. This includes custom fields that were added to the directus_users/directus_roles tables.</p><p>Note: This feature is only available for permissions, validation, and presets. Regular filters and conditional fields currently only support the root ID.</p></div>`,33),e=[l];function p(r,c,D,i,d,F){return n(),a("div",null,e)}const C=s(o,[["render",p]]);export{u as __pageData,C as default};
