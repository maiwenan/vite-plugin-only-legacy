import { type PluginOption } from 'vite'
import modify from './modify'

export default function onlyLegacy(): PluginOption {
  return {
    name: 'vite-plugin-modify-html',
    enforce: 'post',
    transformIndexHtml: modify,
  }
}
