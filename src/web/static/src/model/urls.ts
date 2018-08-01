export default {
    INGEST_IMAGE: '/ingest_image',
    REFERENCE_NAMES: '/reference_names',    
    TEST: '/test',
    LOAD_TAGS: '/tag',
    IMAGE: '/image',
    parseExistingImage: (id: string) => '/image/' + id + '/parse',
    testId: (id: string) => '/test/' + id,
    findTestId: (date: string) => '/find_test_id?date=' + date,
    imageId: (id: string) => '/image/' + id
}