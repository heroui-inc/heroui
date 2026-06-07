"use client";

import {Button, toast} from "@heroui/react";

const uploadFile = (): Promise<{filename: string; size: number}> => {
  return new Promise<{filename: string; size: number}>((resolve) => {
    setTimeout(() => resolve({filename: "document.pdf", size: 1024}), 2000);
  });
};

const createEvent = (): Promise<never> => {
  return new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error("网络错误，请重试。")), 2000);
  });
};

const saveData = (): Promise<{count: number}> => {
  return new Promise<{count: number}>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({count: 42});
      } else {
        reject(new Error("保存数据失败"));
      }
    }, 2000);
  });
};

const fetchUser = (): Promise<{name: string; email: string}> => {
  return new Promise<{name: string; email: string}>((resolve) => {
    setTimeout(() => resolve({email: "john@example.com", name: "John Doe"}), 2000);
  });
};

export function PromiseDemo() {
  return (
    <div className="flex h-full max-w-2xl flex-col items-center justify-center gap-8">
      {/* Promise API Section */}
      <div className="w-full space-y-3">
        <div className="text-center">
          <h3 className="text-sm font-medium">使用 toast.promise()</h3>
          <p className="text-xs text-muted">自动处理加载、成功和错误状态</p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              toast.promise(uploadFile(), {
                error: "上传文件失败",
                loading: "正在上传文件…",
                success: (data) => `文件 ${data.filename} 已上传（${data.size}KB）`,
              });
            }}
          >
            上传文件
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              toast.promise(createEvent(), {
                error: (err) => err.message,
                loading: "正在创建活动…",
                success: "活动已创建",
              });
            }}
          >
            创建活动（错误）
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              toast.promise(saveData(), {
                error: (err) => err.message,
                loading: "正在保存更改…",
                success: (data) => `已保存 ${data.count} 项`,
              });
            }}
          >
            保存数据（随机）
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              toast.promise(fetchUser(), {
                error: "获取用户失败",
                loading: "正在加载用户…",
                success: (data) => `欢迎回来，${data.name}！`,
              });
            }}
          >
            获取用户
          </Button>
        </div>
      </div>

      {/* Manual Loading Section */}
      <div className="w-full space-y-3">
        <div className="text-center">
          <h3 className="text-sm font-medium">手动加载状态</h3>
          <p className="text-xs text-muted">使用 isLoading 属性手动控制加载状态</p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              const loadingId = toast("正在上传文件…", {
                description: "请稍候，正在上传您的文件",
                isLoading: true,
                timeout: 0,
              });

              setTimeout(() => {
                toast.close(loadingId);
                toast.success("文件已上传", {
                  description: "您的文件已成功上传",
                });
              }, 3000);
            }}
          >
            上传（含加载）
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              const loadingId = toast("正在处理付款…", {
                isLoading: true,
                timeout: 0,
              });

              setTimeout(() => {
                toast.close(loadingId);
                toast.success("付款已处理", {
                  description: "您的付款已成功处理",
                });
              }, 2500);
            }}
          >
            付款处理
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              const loadingId = toast("正在保存更改…", {
                isLoading: true,
                timeout: 0,
              });

              setTimeout(() => {
                toast.close(loadingId);
                toast.danger("保存失败", {
                  description: "请重试",
                });
              }, 2000);
            }}
          >
            加载后显示错误
          </Button>
        </div>
      </div>
    </div>
  );
}
