"use client";

import { Form, FormInput, FormSelect } from "@repo/ui";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2, "用户名至少2个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  age: z.string().transform(Number).pipe(z.number().min(18, "年龄必须大于18岁")),
  role: z.string().min(1, "请选择角色"),
  bio: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

const roleOptions = [
  { value: "admin", label: "管理员" },
  { value: "editor", label: "编辑" },
  { value: "viewer", label: "访客" },
];

export default function FormsDemoPage() {
  const handleSubmit = async (data: UserFormData) => {
    console.log("表单数据:", data);
    alert(`提交成功！\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">表单组件示例</h1>
          <p className="mt-2 text-gray-600">
            使用 React Hook Form + Zod 实现的表单验证
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <Form
            schema={userSchema}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <FormInput
              name="name"
              label="用户名"
              placeholder="请输入用户名"
              required
            />

            <FormInput
              name="email"
              label="邮箱"
              type="email"
              placeholder="your@email.com"
              required
            />

            <FormInput
              name="age"
              label="年龄"
              type="number"
              placeholder="请输入年龄"
              required
              description="必须年满18岁"
            />

            <FormSelect
              name="role"
              label="角色"
              options={roleOptions}
              placeholder="请选择角色"
              required
            />

            <FormInput
              name="bio"
              label="个人简介"
              placeholder="介绍一下自己..."
            />

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                提交表单
              </button>
              <button
                type="reset"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                重置
              </button>
            </div>
          </Form>
        </div>

        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">代码示例</h2>
          <pre className="text-sm bg-gray-900 text-gray-300 rounded-lg p-4 overflow-x-auto">
{`import { Form, FormInput, FormSelect } from "@repo/ui";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "用户名至少2个字符"),
  email: z.string().email("请输入有效的邮箱地址"),
  role: z.string().min(1, "请选择角色"),
});

function MyForm() {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <FormInput name="name" label="用户名" required />
      <FormInput name="email" label="邮箱" type="email" required />
      <FormSelect name="role" label="角色" options={options} />
      <button type="submit">提交</button>
    </Form>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
