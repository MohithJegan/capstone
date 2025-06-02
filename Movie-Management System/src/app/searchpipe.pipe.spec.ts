import { SearchpipePipe } from './searchpipe.pipe';

describe('SearchpipePipe', () => {

  let searchPipe: SearchpipePipe;
  beforeEach(()=>{
    searchPipe = new SearchpipePipe()
  })

  it('create an instance', () => {
    // const pipe = new SearchpipePipe();
    expect(searchPipe).toBeTruthy();
  });

  // spec-2
  // it("return search value",()=>{
  //   const arrayInfo = ["Ramya","Daniel"]
  //   const searchValue = "ra"
  //   const search = searchPipe.transform(arrayInfo,searchValue)
  //   const result = 'Ramya'
  //   expect(searchPipe.transform(search)).toBe(result)
  // })
});
