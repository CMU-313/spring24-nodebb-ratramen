<!-- IMPORT partials/breadcrumbs.tpl -->
<div data-widget-area="header">
    {{{each widgets.header}}}
    {{widgets.header.html}}
    {{{end}}}
</div>
<div class="row">
    <div class="<!-- IF widgets.sidebar.length -->col-lg-9 col-sm-12<!-- ELSE -->col-lg-12<!-- ENDIF widgets.sidebar.length -->">
        {{{ if pagination.pages.length }}}
        <div><!-- IMPORT partials/category-selector.tpl --></div>
        {{{ else }}}
        <h1 class="categories-title">[[pages:categories]]</h1>
        <noscript><div class="contianer" id="content" component="category-selector"></noscript>
            <label component="category/post" for="category-dropdown-check" class="btn btn-primary" id="new_category" role="button">
                New Category
            </label>
            <noscript>
                <input type="checkbox" class="hidden" id="category-dropdown-check" aria-hidden="true">
                <ul component="category/list" class="dropdown-menu category-dropdown-menu" role="menu">
                    {{{each categories}}}
                    <li role="presentation" class="category {{{if categories.disabledClass}}}disabled{{{end}}}">
                        <a role="menu-item" href="{config.relative_path}/compose?cid={categories.cid}">{categories.level}<span component="category-markup">{{{if categories.icon}}}<span class="fa-stack" style="{function.generateCategoryBackground}"><i style="color: {categories.color};" class="fa fa-stack-1x fa-fw {categories.icon}"></i></span>{{{end}}} {categories.name}</span></a>
                    </li>
                    {{{end}}}
                </ul>
            </div>
        </noscript>
        {{{ end }}}
        <ul class="categories" itemscope itemtype="http://www.schema.org/ItemList">
            {{{each categories}}}
            <!-- IMPORT partials/categories/item.tpl -->
            {{{end}}}
        </ul>
        <!-- IMPORT partials/paginator.tpl -->
    </div>
    <div data-widget-area="sidebar" class="col-lg-3 col-sm-12 <!-- IF !widgets.sidebar.length -->hidden<!-- ENDIF !widgets.sidebar.length -->">
        {{{each widgets.sidebar}}}
        {{widgets.sidebar.html}}
        {{{end}}}
    </div>
</div>
<div data-widget-area="footer">
    {{{each widgets.footer}}}
    {{widgets.footer.html}}
    {{{end}}}
</div>
