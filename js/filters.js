
// Update url params with current filter settings
function urlSetFilters() {

    // Get current URL, update the params and then use it to replace the current url
    let url = new URL(window.location);

    url.searchParams.set('softwareTags', document.getElementById('softwareTagsFilter').value);
    url.searchParams.set('categoryTags', document.getElementById('categoryTagsFilter').value);
    url.searchParams.set('gameTypeTags', document.getElementById('gameTypeTagsFilter').value);
    url.searchParams.set('yearReleased', document.getElementById('yearReleasedFilter').value);

    url.searchParams.set('openSource',   document.getElementById('openSourceFilter').checked);
    url.searchParams.set('linkPlay',     document.getElementById('linkPlayFilter').checked);
    url.searchParams.set('cartRelease',  document.getElementById('cartReleaseFilter').checked);
    url.searchParams.set('laptopOnly'   ,document.getElementById('laptopOnlyFilter').checked);

    url.searchParams.set('textSearch',   document.getElementById('textSearch').value);

    url.searchParams.set('sortSelector',   document.getElementById('sortSelector').value);

    window.history.replaceState(null, "", url.href);
}

// Read filter settings from url params
function urlGetFilters() {
    // Get current URL, update the params and then use it to replace the current url
    let url = new URL(window.location);

    if (url.searchParams.get('softwareTags')  !== null) document.getElementById('softwareTagsFilter').value =   url.searchParams.get('softwareTags');
    if (url.searchParams.get('categoryTags')  !== null) document.getElementById('categoryTagsFilter').value =   url.searchParams.get('categoryTags');
    if (url.searchParams.get('gameTypeTags')  !== null) document.getElementById('gameTypeTagsFilter').value =   url.searchParams.get('gameTypeTags');
    if (url.searchParams.get('yearReleased')  !== null) document.getElementById('yearReleasedFilter').value =   url.searchParams.get('yearReleased');

    if (url.searchParams.get('openSource')    !== null) document.getElementById('openSourceFilter').checked =    ('true' === url.searchParams.get('openSource').toLowerCase());
    if (url.searchParams.get('linkPlay')      !== null) document.getElementById('linkPlayFilter').checked =      ('true' === url.searchParams.get('linkPlay').toLowerCase());
    if (url.searchParams.get('cartRelease')   !== null) document.getElementById('cartReleaseFilter').checked =   ('true' === url.searchParams.get('cartRelease').toLowerCase());
    if (url.searchParams.get('laptopOnly')    !== null) document.getElementById('laptopOnlyFilter').checked =    ('true' === url.searchParams.get('laptopOnly').toLowerCase());

    if (url.searchParams.get('textSearch')    !== null) document.getElementById('textSearch').value =   url.searchParams.get('textSearch');

    if (url.searchParams.get('sortSelector')  !== null) document.getElementById('sortSelector').value = url.searchParams.get('sortSelector');
}

// Reset all filters to defaults
function resetFilters() {
    document.getElementById('softwareTagsFilter').value = FILTER_ALL;
    document.getElementById('categoryTagsFilter').value = FILTER_ALL;
    document.getElementById('gameTypeTagsFilter').value = FILTER_ALL;
    document.getElementById('yearReleasedFilter').value = FILTER_ALL;

    document.getElementById('openSourceFilter').checked =   false;
    document.getElementById('linkPlayFilter').checked =     false;
    document.getElementById('cartReleaseFilter').checked =  false;
    document.getElementById('laptopOnlyFilter').checked =   false;

    document.getElementById('textSearch').value = '';

    document.getElementById('sortSelector').value = SORTING_DEFAULT;

}


// Create filter entries based on attributes of all gallery items
function populateFilters(galleryItems) {
    const softwareTagsSet  = new Set();
    const categoryTagsSet  = new Set();
    const gameTypesTagsSet = new Set();
    const yearReleasedSet  = new Set();
    const filterAll = "<option selected value=\"" + FILTER_ALL + "\">" + FILTER_ALL + "</option>";

    // Parse the JSON gallery entries and extract tags from them
    galleryItems.forEach(item => {
        if (item.softwareTags) item.softwareTags.split(', ').forEach(tag =>  softwareTagsSet.add(tag));
        if (item.categoryTags) item.categoryTags.split(', ').forEach(tag =>  categoryTagsSet.add(tag));
        if (item.gameTypeTags) item.gameTypeTags.split(', ').forEach(tag => gameTypesTagsSet.add(tag));
        if (item.yearFirstReleased != '') yearReleasedSet.add(item.yearFirstReleased);
    });


    // Now sort and create filter option item entries for each tag per type in html form
    const softwareOptions = Array.from(softwareTagsSet).map(tag =>  `<option value="${tag}">${tag}</option>`).sort().join('');
    const categoryOptions = Array.from(categoryTagsSet).map(tag =>  `<option value="${tag}">${tag}</option>`).sort().join('');
    const gameTypeOptions = Array.from(gameTypesTagsSet).map(tag => `<option value="${tag}">${tag}</option>`).sort().join('');
    const yearReleasedOptions = Array.from(yearReleasedSet).map(tag => `<option value="${tag}">${tag}</option>`).sort().join('');

    // And attach them to the multi-select controls
    document.getElementById('softwareTagsFilter').innerHTML = filterAll + softwareOptions;
    document.getElementById('categoryTagsFilter').innerHTML = filterAll + categoryOptions;
    document.getElementById('gameTypeTagsFilter').innerHTML = filterAll + gameTypeOptions;
    document.getElementById('yearReleasedFilter').innerHTML = filterAll + yearReleasedOptions;

    // Sorting options
    const sortOptions = SORT_OPTIONS.map(sortType => `<option value="${sortType}">${sortType}</option>`).join('');
    document.getElementById('sortSelector').innerHTML = sortOptions;
}


// Check for a given gallery item if it's tags of type N are enabled by the matching multi-select filter
function checkMultiSelectFilter(filterName, filterTagsSelected, item) {
    var isEnabled = true;
    if (item.dataset[filterName + 'Tags']) {
        isEnabled = false;
        // Extract all tags from the item
        item.dataset[filterName + 'Tags'].split(', ').forEach(tag => {
            // Check if any of the item tags is enabled as a selection in the Filter
            if (filterTagsSelected.some(value => (value === tag) || value === FILTER_ALL)) { isEnabled = true; }
        });
    }
    return isEnabled;
}


// Update displayed items based on their metadata and the filters
function applyFilters() {

    // If sorting changed then update sort method and do a reload
    if (gallerySorting !== document.getElementById('sortSelector').value) {
        gallerySorting = document.getElementById('sortSelector').value;

        removeAllGalleryItems();
        addAndSortGalleryItems();
    }

    const softwareTagsSelected = Array.from(document.getElementById('softwareTagsFilter').selectedOptions).map(option => option.value);
    const categoryTagsSelected = Array.from(document.getElementById('categoryTagsFilter').selectedOptions).map(option => option.value);
    const gameTypeTagsSelected = Array.from(document.getElementById('gameTypeTagsFilter').selectedOptions).map(option => option.value);
    const openSourceOnly    = document.getElementById('openSourceFilter').checked;
    const linkPlayOnly      = document.getElementById('linkPlayFilter').checked;
    const cartReleaseOnly   = document.getElementById('cartReleaseFilter').checked;
    const laptopOnly        = document.getElementById('laptopOnlyFilter').checked;
    const yearReleasedMatch = document.getElementById('yearReleasedFilter').value;
    const textSearchMatch   = document.getElementById('textSearch').value;
    const items = document.querySelectorAll('.gallery_grid_item');


    // TODO: ? Convert filters from arrays to simple compares now that they are single-select instead of multi-select

    // Check whether each item is enabled based on the filters
    let matchCount = 0;
    items.forEach(item => {
        let softwareNoMatch   = !checkMultiSelectFilter('software', softwareTagsSelected, item);
        let categoryNoMatch   = !checkMultiSelectFilter('category', categoryTagsSelected, item);
        let gameTypeNoMatch   = !checkMultiSelectFilter('gameType', gameTypeTagsSelected, item);
        let laptopOnlyNoMatch = !checkMultiSelectFilter('platform', ["Laptop"], item);

             if ((openSourceOnly    === true) && (!item.dataset.hasOwnProperty('isOpenSource')))       item.style.display = 'none';
        else if ((linkPlayOnly      === true) && (!item.dataset.hasOwnProperty('supportsLinkPlay')))   item.style.display = 'none';
        else if ((cartReleaseOnly   === true) && (!item.dataset.hasOwnProperty('hasPhysicalRelease'))) item.style.display = 'none';
        else if ((yearReleasedMatch !== 'All') && (item.dataset['yearFirstReleased'] !== yearReleasedMatch))       item.style.display = 'none';
        else if ((textSearchMatch   !== '')
                 && (item.dataset['authorName'].toLowerCase().includes(textSearchMatch.toLowerCase()) === false)
                 && (item.dataset['itemTitle'].toLowerCase().includes(textSearchMatch.toLowerCase()) === false)
                 // Optional text search of description as well
                 && (item.dataset['shortDescription'].toLowerCase().includes(textSearchMatch.toLowerCase()) === false)
                 ) item.style.display = 'none';
        else if (softwareNoMatch || categoryNoMatch || gameTypeNoMatch || (laptopOnlyNoMatch && laptopOnly)) item.style.display = 'none';
        else {
            // Otherwise ok to show item
            item.style.display = ''; matchCount += 1;
        }
    });

    // Show number of results found
    document.getElementById('numFoundResult').textContent = matchCount;

    // Update the URL params to match the new search criteria
    urlSetFilters();
}


function addFilterUpdateHooks() {
    // Event listener to handle filter changes
    // Filter settings
    document.querySelectorAll('.filter_container select, input, #sortSelector').forEach(filter => {
        filter.addEventListener('change', () => {
            applyFilters();
        });
        // Update search as the user types in the text field
        filter.addEventListener('input', () => {
            applyFilters();
        });
    });

    // Reset Filters button
    let elResetButton = document.querySelector('#resetFilterButton');
    elResetButton.addEventListener('click', () => {
            resetFilters();
            applyFilters();
        });

    // Copy Link Filters button
    let elCopyLinkButton = document.querySelector('#copyLinkFilterButton');
    elCopyLinkButton.addEventListener('click', () => {
            copyTextToClipboard(window.location.href);
        });
}
