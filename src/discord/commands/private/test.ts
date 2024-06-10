import { Command, Responder, ResponderType } from "#base";
import { icon, res } from "#functions";
import { createRow, sleep } from "@magicyan/discord";
import { ApplicationCommandType, ButtonBuilder, ButtonStyle } from "discord.js";

new Command({
    name: "test",
    description: "test",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const row = createRow(
            new ButtonBuilder({
                customId: "test", 
                label: "Botão de teste",
                emoji: icon.favorite, 
                style: ButtonStyle.Success
            })
        );
        interaction.reply(res.success(`${icon.success} Tudo certo`, { components: [row] }));
    }
});

new Responder({
    customId: "test",
    type: ResponderType.Button, cache: "cached",
    async run(interaction) {
        interaction.update(res.warning(`${icon.spinner} Aguarde...`, { components: [] }));
        await sleep(4000);
        interaction.editReply(res.danger(`${icon.danger} Ocorreu um erro`));

        // RINCKO implementar atualização no banco de dados
    },
});