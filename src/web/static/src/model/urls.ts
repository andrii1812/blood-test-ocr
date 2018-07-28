export default {
    INGEST_IMAGE: '/ingest_image',
    REFERENCE_NAMES: '/reference_names',    
    TEST: '/test',
    testId: (id: string) => '/test/' + id,
    findTestId: (date: string) => '/find_test_id?date=' + date
}