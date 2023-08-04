import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import compressPlugin from 'vite-plugin-compression';
// import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // Listening on all local IPs
    host: true,
    https: false,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://dkc.slave1.dypxxm.com',
        changeOrigin: true,
      },
    }
  },

  plugins: [
    vue(),
    compressPlugin({
      ext: '.gz',
      deleteOriginFile: false,
    })
    // obfuscatorPlugin({
    //   options: {
    //     compact: true, // 将代码输出压缩为一行
    //     controlFlowFlattening: false, // 使代码控制流扁平化。控制流扁平化是源代码的一种结构转换，它阻碍了程序的理解
    //     controlFlowFlatteningThreshold: 0.75,// controlFlowFlattening 转换应用节点的概率
    //     deadCodeInjection: false,
    //     deadCodeInjectionThreshold: 0.4,
    //     debugProtection: false,
    //     debugProtectionInterval: 0,
    //     disableConsoleOutput: false,
    //     domainLock: [],
    //     domainLockRedirectUrl: 'about:blank',
    //     forceTransformStrings: [],
    //     identifierNamesCache: null,
    //     identifierNamesGenerator: 'hexadecimal',
    //     identifiersDictionary: [],
    //     identifiersPrefix: '',
    //     ignoreImports: false,
    //     inputFileName: '',
    //     log: false,
    //     numbersToExpressions: false,
    //     optionsPreset: 'default',
    //     renameGlobals: false,
    //     renameProperties: false,
    //     renamePropertiesMode: 'safe',
    //     reservedNames: [],
    //     reservedStrings: [],
    //     seed: 0,
    //     selfDefending: false,
    //     simplify: true,
    //     sourceMap: false,
    //     sourceMapBaseUrl: '',
    //     sourceMapFileName: '',
    //     sourceMapMode: 'separate',
    //     sourceMapSourcesMode: 'sources-content',
    //     splitStrings: false,
    //     splitStringsChunkLength: 10,
    //     stringArray: true,
    //     stringArrayCallsTransform: true,
    //     stringArrayCallsTransformThreshold: 0.5,
    //     stringArrayEncoding: [],
    //     stringArrayIndexesType: [
    //       'hexadecimal-number'
    //     ],
    //     stringArrayIndexShift: true,
    //     stringArrayRotate: true,
    //     stringArrayShuffle: true,
    //     stringArrayWrappersCount: 1,
    //     stringArrayWrappersChainedCalls: true,
    //     stringArrayWrappersParametersMaxCount: 2,
    //     stringArrayWrappersType: 'variable',
    //     stringArrayThreshold: 0.75,
    //     target: 'browser',
    //     transformObjectKeys: false,
    //     unicodeEscapeSequence: false
    //   },
    // }),
  ],
})
