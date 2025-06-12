import { SearchpipePipe } from './searchpipe.pipe';

describe('SearchpipePipe', () => {

  let searchPipe: SearchpipePipe;
  beforeEach(()=>{
    searchPipe = new SearchpipePipe()
  })

  it('create an instance', () => {
    expect(searchPipe).toBeTruthy();
  });

});
