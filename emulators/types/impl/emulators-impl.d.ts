import { Emulators, CommandInterface, BackendOptions, DosConfig, InitFs, InitBundleEntry } from "../emulators";
import { IWasmModules } from "./modules";
import DosBundle from "../dos/bundle/dos-bundle";
import { TransportLayer } from "../protocol/protocol";
declare class EmulatorsImpl implements Emulators {
    pathPrefix: string;
    pathSuffix: string;
    version: string;
    wdosboxJs: string;
    wdosboxxJs: string;
    private wasmModulesPromise?;
    bundle(): Promise<DosBundle>;
    bundleConfig(bundle: InitBundleEntry): Promise<DosConfig | null>;
    bundleUpdateConfig(bundle: InitBundleEntry, config: DosConfig): Promise<Uint8Array>;
    dosboxNode(init: InitFs, options?: BackendOptions): Promise<CommandInterface>;
    dosboxDirect(init: InitFs, options?: BackendOptions): Promise<CommandInterface>;
    dosboxWorker(init: InitFs, options?: BackendOptions): Promise<CommandInterface>;
    dosboxXNode(init: InitFs, options?: BackendOptions): Promise<CommandInterface>;
    dosboxXDirect(init: InitFs, options?: BackendOptions): Promise<CommandInterface>;
    dosboxXWorker(init: InitFs, options?: BackendOptions): Promise<CommandInterface>;
    backend(init: InitFs, transportLayer: TransportLayer, options?: BackendOptions): Promise<CommandInterface>;
    wasmModules(): Promise<IWasmModules>;
    dosDirect(init: InitFs): Promise<CommandInterface>;
    dosWorker(init: InitFs): Promise<CommandInterface>;
}
declare const emulators: EmulatorsImpl;
export default emulators;
