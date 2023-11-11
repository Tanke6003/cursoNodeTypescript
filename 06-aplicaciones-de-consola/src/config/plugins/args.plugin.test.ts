
const runCommand = async(args:string[])=>{
  process.argv =[...process.argv, ...args];
  const { argv } = await import('./args.plugin') ;
  return argv
}

describe("config/plugins/args",()=>{
  const originalArgv = process.argv;
  beforeEach(()=>{
    process.argv = originalArgv;
    jest.resetModules();
    jest.clearAllMocks();
  })

  test("should return default values",async()=>{
    const argv = await runCommand(['-b','5'])
    expect(argv).toEqual(expect.objectContaining(
      {
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs',
      }
    ))
  })
  test("should return custom values ",async()=>{
    const args:string[] = [ '-b','10','-l','20','-s','true','-n','custom','-d','test' ]
    const argv = await runCommand(args)
    console.log(args[3])
    expect(argv).toHaveProperty('b')
    expect(argv.b).toBe(Number(args[1]));
    expect(argv).toHaveProperty('l')
    expect(argv.l).toBe(Number(args[3]));
    expect(argv).toHaveProperty('s')
    expect(argv.s).toBe(Boolean(args[5]));
    expect(argv).toHaveProperty('n')
    expect(argv.n).toBe(args[7]);
    expect(argv).toHaveProperty('d')
    expect(argv.d).toBe(args[9]);
  })

})